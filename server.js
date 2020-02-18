const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use((request, response, next) => {
  console.log(request.url, request.headers);
  next();
});
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'static/index.html')),
);
app.use(
  express.static(path.join(__dirname, 'static'), {
    setHeaders: (res, path, stat) => {
      res.set('Cache-Control', 'max-age=0, must-revalidate');
      res.set('Expires', '-1');
    },
  }),
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
