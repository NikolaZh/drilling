const express = require("express");
const app = express();

app.get("/",(req,res,next)=>{
      res.status(200);
      res.send(index.html)
});





app.listen(3000, () => {
console.log("Server start on 3000 port")});
