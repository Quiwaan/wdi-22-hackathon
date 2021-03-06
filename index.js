require('dotenv').config();
const express = require('express');
const expressJwt = require('express-jwt');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

function fromRequest(req){
  console.log("REQ.BODY",req.body.headers)
  if(req.body.headers.Authorization &&
    req.body.headers.Authorization.split(' ')[0] === 'Bearer'){
    return req.body.headers.Authorization.split(' ')[1];
  }
  return null;
}

app.use(
  '/auth',
  expressJwt({
    secret: process.env.JWT_SECRET,
    getToken: fromRequest,
  }).unless({
    path: [
      { url: '/auth/login', methods: ['POST'] },
      { url: '/auth/signup', methods: ['POST'] },
    ],
  }),
  require('./controllers/auth')
);

app.get('*', function(req, res, next) {
  res.status(404).send({ message: 'Not Found' });
});

app.listen(process.env.PORT || 3000);
