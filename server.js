const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({ extended: false }));

app.use('/user', (req, res, next) => {
  res.send('Please log in');
  next();
});
app.get('/user/panel', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/forbidden.html'));
});
app.get('/user/settings', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/forbidden.html'));
});


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

// post

app.post('/contact/send-message', (req, res) => {
  const { author, sender, title, message, image } = req.body;

  if(author && sender && title && message && image) {
    res.send('The message has been sent!');
  }
  else {
    res.send('You can\'t leave fields empty!')
  }
});

app.use((req, res, next) => {
  res.render('404');
});


app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
