const uuidv1 = require('uuid/v1');

module.exports = function(app,API_URL){
    orderList = [];
    const BTC_API_URL = `${API_URL}/bitcoin`;

    app.post(BTC_API_URL, (req,res)=>{
        let order = req.body;
        if(typeof(order) !=='undefined'){
            order.id = uuidv1();
            orderList.push(order);
            res.status(200).json(order);
        }
    });
    
    app.get(BTC_API_URL, (req,res)=>{
        let returnResult = [];
        orderList.forEach((element=>{
            if(element){
                returnResult.push(element);
            }
        }))
        res.status(200).json(returnResult);
    });
    
    app.get(`${BTC_API_URL}/:orderId`, (req,res)=>{
        let orderId = req.params.orderId;
        let orderFound = orderList.find(x => {
            if(typeof(x) !== 'undefined'){
                return x.id == orderId;
            }
            return null;
        });
        console.log(orderFound);
        if(orderFound){
            res.status(200).json(orderFound);
        }
    });
    
    app.put(BTC_API_URL, (req,res)=>{
        let orderId = req.query.orderId;
        let order = req.body;
        const index = orderList.findIndex(x => {
            if(typeof(x) !== 'undefined'){
                return x.id == orderId;
            }
            return null;
        });
        if (index === -1) {
            res.status(500).json({error: 'error update'})
        } else {
            let ordertoUpdate = orderList[index];
            ordertoUpdate.contactNo = order.contactNo;
            ordertoUpdate.name = order.name;
            ordertoUpdate.gender = order.gender;
            ordertoUpdate.dob = order.dob;
            ordertoUpdate.orderDate = order.orderDate;
            ordertoUpdate.orderType = order.orderType;
            ordertoUpdate.orderUnit = order.orderUnit;
            ordertoUpdate.price = order.price;
            ordertoUpdate.qrUrl = order.qrUrl;
            ordertoUpdate.address = order.address;
            ordertoUpdate.amt = order.amt;
            orderList[index] = ordertoUpdate;
            res.status(200).json(ordertoUpdate);
        }
    });
}


