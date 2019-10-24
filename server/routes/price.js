const request = require('request');

module.exports = function(app,API_URL){
    const BTC_PRICE_API_URL = `${API_URL}/price`;
    const PRICE_API_URL = process.env.PRICE_API_URL;

    app.get(BTC_PRICE_API_URL, (req, res)=>{
        let primaryCurrency = req.query.primaryCurry;
        let secondaryCurrency = req.query.secondaryCurry;
        const options = {
            url: `${PRICE_API_URL}${primaryCurrency},${secondaryCurrency}`,
            headers: {
                'Accept': 'application/json',
                'X-testing': 'testing'
            }
        };
        
        request(options, (error, response, body)=>{
            if (!error && response.statusCode == 200) {
                res.status(200).json(JSON.parse(body));
            };
        });
    })
}
