const 
    express = require(`express`),
    path = require(`path`),
    favicon = require(`serve-favicon`),
    logger = require(`morgan`),
    cookieParser = require(`cookie-parser`),
    bodyParser = require(`body-parser`),
    partial = require('express-partials'),
    http = require(`http`),
    markdownit = require('markdown-it'),
    highlight = require('highlight.js'),

    config = require('require-yml')('config'),
    mainData = require('./db.json'),
    app = express();

app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `ejs`);

app.use(logger(`dev`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(favicon(path.join(__dirname, `/favicon.jpg`)));
app.use(express.static(path.join(__dirname, `public`)));
app.use(partial());

app.use((req, res, next) => {
  res.locals.$config = config;
  res.locals.$categories = mainData.categories;
  res.locals.$tags = mainData.tags;
  res.locals._markdown = str => markdownit({
    html: true,
    highlight: (str, lang) => {
      if (lang && highlight.getLanguage(lang))
        try {
          return highlight.highlight(lang, str).value;
        } catch (__) {};
      return '';
    }
  }).render(str);
  next();
});

app.use('/', require(`./routers`));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get(`env`) === `development` ? err : {};

  res.status(err.status || 500);
  console.log(err);
});

// 创建HTTP连接
(http
  .createServer(app)
  .listen(config.port))
  .on('error', error => {throw error})
  .on('listening', () => console.log(`HTTP服务创建成功，监听端口：${config.port}`));
