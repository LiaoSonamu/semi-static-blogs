const 
  router = require('express').Router(),
  config = require('require-yml')('config'),
  mainData = require('./db.json');

const pagination = (page=0, lists) => {
  let maxPage = Math.ceil(lists.length / config.page_size) - 1;
  page = page < 0 ? 0 : page > maxPage ? maxPage : page;
  return {articles: lists.slice(config.page_size * page, config.page_size), page: page, right: 'lists'}
}

router.get('/', (req, res, next) => {
  let {page = 0} = req.query;
  let lists = mainData.articles;
  res.render('index', Object.assign(pagination(page, lists), {pathNav: []}));
});

router.get('/tag/:tag', (req, res, next) => {
  let {page = 0} = req.query;
  let tagid = decodeURI(req.params.tag);
  let lists = mainData.articles.filter(v => v.head.tags.includes(tagid));
  res.render('index', Object.assign(pagination(page, lists), {pathNav: [
    {name: tagid}
  ]}));
});

router.get('/category/:category', (req, res, next) => {
  let {page = 0, type = 0} = req.query;
  let category = decodeURI(req.params.category);
  let lists = mainData.articles.filter(v => v.categories[type] === category);
  res.render('index', Object.assign(pagination(page, lists), {pathNav: [
    {name: category}
  ]}));
});

router.get('/article/:articleid', (req, res, next) => {
  let articleid = req.params.articleid;
  for(let i = 0, j = mainData.articles.length; i < j; i++) {
    if(mainData.articles[i].head.id === articleid) {
      return res.render('index', {article: mainData.articles[i], right: 'detail', pathNav: [
        {name: mainData.articles[i].categories[0], url: `/category/${encodeURI(mainData.articles[i].categories[0])}?type=0`},
        {name: mainData.articles[i].categories[1], url: `/category/${encodeURI(mainData.articles[i].categories[1])}?type=1`},
        {name: mainData.articles[i].title}
      ]})
    }
  }
});

module.exports = router;
