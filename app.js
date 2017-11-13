const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');
app.use('/static', express.static('public'));
app.get('/', (req, res) => {
    res.render('index', { title: 'TestIndex' });
});
app.use((req, res) => {
    res.status(404);
    res.send('Not found 404');
});
app.listen(3000, () => {
    console.log('Server Starts on 3000 port');
});
