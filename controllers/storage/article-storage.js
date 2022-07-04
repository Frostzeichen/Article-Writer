//PRELOADING
//fauna
const faunadb = require("faunadb")
const q = faunadb.query;
const serverClient = new faunadb.Client({ secret: 'fnAEpWUSYOACU7N-i78QFG_sp94yh1ES6_P03RZQ' });
// fnAEofWWaaACVJTEs0sSlcgu81glkeT3D-K2qDcj　六十四式

//SERVER
// Storage for list of titles.
let articleTitles = [];

// Gathers a list of titles.
serverClient.query(q.Map(
  q.Paginate(q.Match(q.Index("is_article"), true)),
  q.Lambda((article) => q.Get(article))
))
.then((ret) => {
  let gatheredArticleTitles = ret.data.map(
    (article) => article.data
  );
  for (let i = 0; i < Object.keys(gatheredArticleTitles).length; i++){
    articleTitles.push({
      title: gatheredArticleTitles[i].title,
      author: gatheredArticleTitles[i].author,
      content: gatheredArticleTitles[i].content
    })
  }
})

exports.listArticles = articleTitles