const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app1 = express();
const app2 = express();

app1.use(express.json()); // For Express 4.16.0 and higher
app2.use(bodyParser.text()); // 用于解析文本类型的请求体

// env配置
require('dotenv').config(); // env环境变量，host配置
const ORIGN = process.env.ORIGN;


const users = [
  {username:'pp', password:'666'},
  {username:'tt', password:'666'},
  {username:'hh', password:'222'},
]

// 配置CORS策略
const corsOptions = {
  origin: ORIGN, // 允许所有从localhost发起的请求
};

app1.use(cors(corsOptions));
app2.use(cors(corsOptions));

app1.get('/', (req, res) => {
  res.send('New App.js on port 3000!\n');
});

app2.get('/', (req, res) => {
  res.send('New App.js on port 4000!\n');
});
// 定义一个POST路由
app1.post('/login', (req, res) => {
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

// 处理 4G 模块发送的字符串
app2.post('/receive-string', (req, res) => {
  const receivedString = req.body;
  console.log('Received string from 4G module:', receivedString);
  res.send({ ok: true, message: 'String received successfully' });
});

const PORT1 = 3000;
const PORT2 = 4000;
app1.listen(PORT1, () => {
  console.log(`Server is running on port ${PORT1}`);
});

app2.listen(PORT2, () => {
  console.log(`Server is running on port ${PORT2}`);
});