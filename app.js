const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json()); // For Express 4.16.0 and higher

require('dotenv').config(); // env环境变量，host配置
const ORIGN = process.env.ORIGN;

const users = [
  {username:'pp', password:'666'},
  {username:'tt', password:'666'},
  {username:'hh', password:'111'},
]

// 配置CORS策略
const corsOptions = {
  origin: ORIGN, // 允许所有从localhost发起的请求
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('New App.js!\n');
});

// 定义一个POST路由
app.post('/login', (req, res) => {
  // 直接将接收到的请求体返回给客户端
  console.log(req.body)
  const user = users.find(u => u.username === req.body.username && u.password === req.body.password);
  if (user) {
    console.log("login_true");
    res.send({
      ...req.body,
      ok: true
    });
  } else {
    console.log("login_false");
    res.status(401).send({ ok: false, message: '用户名或密码错误' });  // 使用明确的HTTP状态码和错误消息
  }
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running`);
});
