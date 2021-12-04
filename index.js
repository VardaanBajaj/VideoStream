const express=require('express');
const fs=require('fs');
const path=require('path');
const app=express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req, res)=>{
  res.sendFile(path.join(__dirname + '/index.htm'))
});

app.get('/video',(req, res)=> {
  const path='assets/sample.mp4';
  const stat=fs.statSync(path);
  const fileSize=stat.size;
  const range=req.headers.range;
  console.log(JSON.stringify(req.headers));

  if (range)
  {
    const parts=range.replace(/bytes=/, "").split('-');
    const start=parseInt(parts[0], 10);
    const end=parts[1] ? parseInt(parts[1], 10) : fileSize-1;

    const chunkSize=(end-start)+1;
    const head={
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4'
    };
    res.writeHead(206, head);
    const file=fs.createReadStream(path, {start, end});
    file.on('open', ()=>{
      file.pipe(res);
    });
  }
  else
  {
    const head={
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4'
    };
    res.writeHead(200, head);
    const file=fs.createReadStream(path);
    file.on('open', ()=>{
      file.pipe(res);
    });
  }
});

app.listen(3000, ()=>{
  console.log('Listening on port 3000');
});
