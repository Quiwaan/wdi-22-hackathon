require('dotenv').config();
const express = require('express');
const expressJwt = require('express-jwt');

require('dotenv').config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

function fromRequest(req) {
  if (
    req.body.headers.Authrorization &&
    req.body.headers.Authrorization.split(' ')[0] === 'Bearer'
  ) {
    return req.body.headers.Authrorization.split(' ')[1];
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
