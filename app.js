const express = require('express');
const { getTopics, getArticles } = require('./controllers/endpoint-controllers');
const { handleServerErrors, handle404Errors } = require('./controllers/error-controllers')

const app = express();
app.get('/api/topics', getTopics);
app.get('/api/articles', getArticles);

app.all('*', handle404Errors)
app.use(handleServerErrors)

module.exports = app;