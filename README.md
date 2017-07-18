# SEMI STATIC BLOGS

## TEST

```bash
npm start
```

**注意：**请修改host文件，添加www.bcodey.com到127.0.0.1。评论系统白名单只添加了这个域名，不然评论没法用。

## POST 信息说明

- id: 文章唯一标识，同时也是URL链接参数，最后不要做修改，建议使用英文数字
- date: 创建时间，格式 1979-01-01 00:00:00
- tags: 文章标签，通过引文逗号分隔
- nature: 文章来源，可选(默认：original)。 original原创，translate翻译，reprint转载
- link: 原文地址，非原创型文章必须有该属性
- keywords: SEO关键字，通过引文逗号分隔

说明段落前后三个中横线`---`标记！

## 文章摘要标识

文章开头至`<!--more-->`标识处为文章摘要，即文章列表中显示内容。如果无摘要标识，文章列表将显示全文。