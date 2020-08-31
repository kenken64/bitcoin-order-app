var uuid = require('uuid');

module.exports = function(app,API_URL){
    const BTC_ORDER_API_URL = `${API_URL}/bitcoin`;
    var orderId = "";
    var order = null;

    app.post(BTC_ORDER_API_URL, (req, res)=>{
        const reply = {
            id : uuid.v4(),
            order: req.body
        }
        orderId = reply.id;
        order = req.body;
        res.status(200).json(reply);
    })

    app.get(BTC_ORDER_API_URL + "/:orderId", (req, res)=>{
        console.log(req.params);
        console.log(order);
        res.status(200).json(order);
    })
}
