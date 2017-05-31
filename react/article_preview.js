var React = require('react');
var ReactDom = require('react-dom');
var Preview = require('./components/article_preview.jsx');

ReactDom.render(<Preview promise={$.getJSON('/getArticle')}/>,document.getElementById('content'));
