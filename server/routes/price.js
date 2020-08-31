const ba = require('bitcoinaverage');

module.exports = function(app,API_URL){
    const BTC_PRICE_API_URL = `${API_URL}/price`;
    const publicKey = process.env.BTC_PUBLIC_KEY;
    const secretKey = process.env.BTC_SECRET_KEY;

    app.get(BTC_PRICE_API_URL, (req, res)=>{
        let primaryCurrency = req.query.primaryCurry;
        let secondaryCurrency = req.query.secondaryCurry;
        console.log(primaryCurrency);
        console.log(secondaryCurrency);
        
        var restClient = ba.restfulClient(publicKey, secretKey);
        restClient.getTickerDataPerSymbol('global', primaryCurrency + secondaryCurrency, function(response) {
            console.log(response);
            res.status(200).json(JSON.parse(response));
        }, function(error){
            console.log(error);
        }) ;
    })
}
