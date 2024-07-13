require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");

require("./config/database");

const app = express();

app.set('view engine', 'ejs');

const userRouter = require("./routes/api/users");
const postRouter = require('./routes/api/posts');
const productRouter = require('./routes/api/products');
const orderRouter = require('./routes/api/orders');
const paymentRouter = require('./routes/api/payment');

app.use(logger("dev"));
app.use(express.json());

const auth = require("./config/auth");
app.use('/api/posts', auth);

app.use("/api/users", userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/payments', paymentRouter);

if (process.env.IS_PRODUCTION) {
  const manifest = require('./dist/manifest.json');
  app.use(express.static(path.join(__dirname, "dist")));
  app.get('/*', function(req, res) {
    res.render(path.join(__dirname, 'dist', 'index.ejs'), { manifest });
  });
} else {
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './', 'index.html'));
  });
}

const { PORT = 8000 } = process.env;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
