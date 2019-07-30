const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

const Helmet = require('react-helmet');

console.log('======= PROD BEING SERVED ======== ==== ====== ======= ====');
app.use(favicon(__dirname + '/build/panda.png'));
// the __dirname is the current directory from where the script is running

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/article?id=*', (req, res) => {
  res.sendFile( )
})

app.listen(port);