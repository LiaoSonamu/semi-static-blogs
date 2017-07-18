const fs = require('fs'), crypto = require('crypto');

let mainData = {categories: [], tags: [], articles: []};

// 解析文章以及日志
fs.readdirSync('posts').forEach(category => {
  let stat = fs.statSync(`posts/${category}`);
  if(stat.isDirectory())  mainData.categories.push({name: category, sec: []});
});

mainData.categories.forEach((category, i) => {
  fs.readdirSync(`posts/${category.name}`).forEach(categorySec => {
    let stat = fs.statSync(`posts/${category.name}/${categorySec}`);
    if(stat.isDirectory()) {
      mainData.categories[i].sec.push(categorySec);
      fs.readdirSync(`posts/${category.name}/${categorySec}`).forEach(article => {
        let path = `posts/${category.name}/${categorySec}/${article}`;
        let stat = fs.statSync(path);
        if(stat.isFile() && (article.match(/\.\w+$/) || [])[0] === '.md') mainData.articles.push({
          title: article.replace(/\.\w+$/, ''),
          categories: [category.name, categorySec],
          head: {}
        })
      });
    }
  });
});

mainData.articles.forEach(article => {
  let content = fs.readFileSync(`posts/${article.categories[0]}/${article.categories[1]}/${article.title}.md`, 'utf8');
  article.content = content.replace(/<!--(\w+): (.+)-->/g, (_, $1, $2) => {
    switch($1) {
      case 'tags': article.head[$1] = $2.trim().split(','); break;
      default: article.head[$1] = $2;
    }
    return '';
  }).replace(/^\s*/, '');
  // 如果每页ID 生成文章ID
  if(!article.head.id) {
    article.head.id = crypto.createHash('md5').update(JSON.stringify(article)).digest('hex');
    fs.writeFileSync(`posts/${article.categories[0]}/${article.categories[1]}/${article.title}.md`, `<!--id: ${article.head.id}-->\n${content}`);
  }
  content = article.content.split('<!--more-->');
  article.abstract = content[0];
  article.content = content[1];
});

mainData.articles = mainData.articles.sort((a, b) => new Date(b.head.date) - new Date(a.head.date));

fs.writeFileSync('db.json', JSON.stringify(mainData, null, ' '));