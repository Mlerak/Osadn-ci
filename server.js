// Osadníci – server bez závislostí. Spuštění: node server.js  (port z PORT, jinak 3000)
const http=require('http'),fs=require('fs'),path=require('path');
const games=new Map(),subs=new Map();
const send=(res,code,body,type='application/json')=>{res.writeHead(code,{'Content-Type':type});res.end(body)};
http.createServer((req,res)=>{
 const u=req.url.split('?')[0];
 if(u==='/'||u==='/index.html')return send(res,200,fs.readFileSync(path.join(__dirname,'index.html')),'text/html; charset=utf-8');
 if(u==='/healthz')return send(res,200,'ok','text/plain');
 if(u==='/upgrade.js')return send(res,200,fs.readFileSync(path.join(__dirname,'upgrade.js')),'text/javascript; charset=utf-8');
 const m=u.match(/^\/api\/games\/([A-Z]{4})(\/stream)?$/);
 if(!m)return send(res,404,'{}');
 const id=m[1];
 if(m[2]){
  res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache',Connection:'keep-alive'});
  if(games.has(id))res.write('data: '+games.get(id).data+'\n\n');
  if(!subs.has(id))subs.set(id,new Set());subs.get(id).add(res);
  const ping=setInterval(()=>res.write(': ping\n\n'),25000);
  return req.on('close',()=>{clearInterval(ping);subs.get(id)?.delete(res)});
 }
 if(req.method==='GET'){const g=games.get(id);return g?send(res,200,g.data):send(res,404,'{}')}
 if(req.method==='PUT'){
  let b='';req.on('data',c=>{b+=c;if(b.length>200000)req.destroy()});
  req.on('end',()=>{try{JSON.parse(b)}catch{return send(res,400,'{}')}
   if(!games.has(id)&&games.size>=2000)return send(res,503,'{}');
   games.set(id,{data:b,t:Date.now()});
   for(const s of subs.get(id)||[])s.write('data: '+b+'\n\n');
   send(res,200,'{}')});return;
 }
 send(res,405,'{}');
}).listen(process.env.PORT||3000,()=>console.log('Hra běží na portu '+(process.env.PORT||3000)));
setInterval(()=>{for(const[k,g]of games)if(Date.now()-g.t>12*36e5){games.delete(k);subs.delete(k)}},36e5);
