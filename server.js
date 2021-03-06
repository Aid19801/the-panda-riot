const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

console.log('======= PROD BEING SERVED ======== ==== ====== ======= ====');

app.use(favicon(__dirname + '/build/open-mic-comedy-the-panda-riot.jpg'));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);