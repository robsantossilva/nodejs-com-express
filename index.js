const express = require('express');

const app = express();

app.use("/", (req, res)=>{res.send("olá")})

app.listen(3000, () => console.log('Server is running in 3000'))