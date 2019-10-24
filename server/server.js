const express = require('express'),
      bodyParser = require('body-parser'),
      request = require('request'),
      cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
const API_URL = '/api';
const BTC_API_URL = `${API_URL}/bitcoin`;
const BTC_PRICE_API_URL = `${API_URL}/price`;

const PRICE_API_URL = process.env.PRICE_API_URL;

const APP_PORT = process.env.PORT;
orderList = [];

app.post(BTC_API_URL, (req,res,next)=>{
    let order = req.body;
    console.log(order);
    order.id = orderList.length++;
    orderList.push(order);
    res.status(201).json(order);
});

app.get(BTC_API_URL, (req,res,next)=>{
    res.status(200).json(orderList);
});

app.get(`${BTC_API_URL}/:btcId`, (req,res,next)=>{
    let btcId = req.params.btcId;
    let orderFound = orderList.find(x => x.id == btcId);
    res.status(200).json(orderFound);
});

app.put(BTC_API_URL, (req,res,next)=>{
    let orderId = req.query.btcId;
    let order = req.body;
    console.log(orderId);
    let orderFound = orderList.find(x => x.id == btcId);
    console.log(order);
    res.status(200).json({});
});

app.get(BTC_PRICE_API_URL, (req, res, next)=>{
    let primaryCurrency = req.query.primaryCurry;
    let secondaryCurrency = req.query.secondaryCurry;
    const options = {
        url: `${PRICE_API_URL}${primaryCurrency},${secondaryCurrency}`,
        headers: {
            'Accept': 'application/json'
        }
    };
    
    request(options, (error, response, body)=>{
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.status(200).json(JSON.parse(body));
        };
    });
})

app.listen(APP_PORT, ()=>{
    console.log(`App started at ${APP_PORT}`);
})