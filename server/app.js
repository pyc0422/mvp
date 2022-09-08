const express = require('express');
const path = require('path');
const db = require('../db/index');
console.log('db', typeof db);
const bp = require('body-parser');
const findStock = require('./helper');
const {Users, Stocks} = require('../db/controller');
let app = express();
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.post('/search', (req, res) => {
  console.log('search post', req.body);
  const { symbol } = req.body;
  return findStock(symbol)
    .then((response) => {
      if (response.length === 0) {
        res.send("<script>alert('please enter a valid symbol!'); window.location.href = '/'; </script>")
      } else {
        let data = response[0];
        const stockData =[data['symbol'],data['name'],data['price']];
        res.status(200).send(JSON.stringify(stockData));
      }
    })
})

app.post('/signup', (req, res) => {
  let newUser = req.body;
  console.log('newUser: ', newUser);
  Users.find(newUser, (data) => {
    console.log('user find: ', data);
    if (data.length > 0) {
       return res.status(422).send('user already exists!');
      //res.redirct('/login')
    } else if (!data.length){
      Users.insert(newUser, () => {
        console.log('user added!');
        res.status(201).send('user added!');
      })
    }

  })
});

app.get('/login', (req, res) => {
  res.send()
})
const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
})

 // console.log(params);
        // const queryString = `INSERT INTO stocks (symbol, name,price) VALUES (?, ?, ?)`
        // db.connect();
        // return Stocks.find({symbol: data['symbol']})
        //   .then((data) => {
        //     if (!data) {
        //       db.query(queryString, params, function(err) {
        //         if (err) {
        //           console.log(err);
        //           return;
        //         }
        //         res.status(200).send(JSON.stringify(params));
        //       })
        //     } else {
        //       db.query(`UPDATE stocks SET price=${data['price']} WHERE symbol=${data['symbol']} limit 1`, (err) => {
        //         if (err) throw err;
        //         res.status(200).send(JSON.stringify(params));
        //       })
        //     }
        //   })