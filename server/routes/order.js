const uuidv1 = require('uuid/v1');

module.exports = function(app,API_URL){
    orderList = [];
    const BTC_API_URL = `${API_URL}/bitcoin`;

    app.post(BTC_API_URL, (req,res)=>{
        console.log("called insert!");
        let order = req.body;
        console.log(order);
        if(typeof(order) !=='undefined'){
            console.log(">>>>>" + order);
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
        console.log('get order ...')
        let orderId = req.params.orderId;
        let orderFound = orderList.find(x => {
            console.log(x);
            if(typeof(x) !== 'undefined'){
                return x.id == orderId;
            }
            return null;
        });
        if(orderFound){
            console.log(orderFound);
            res.status(200).json(orderFound);
        }
    });
    
    app.put(BTC_API_URL, (req,res)=>{
        console.log(req);
        let orderId = req.query.orderId;
        let order = req.body;
        console.log(order);
        console.log(orderId);
        const index = orderList.findIndex(x => {
            console.log(x);
            if(typeof(x) !== 'undefined'){
                return x.id == orderId;
            }
            return null;
        });
        console.log(index);
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
            console.log("PRICE > " + order.price);
            ordertoUpdate.price = order.price;
            ordertoUpdate.qrUrl = order.qrUrl;
            ordertoUpdate.address = order.address;
            ordertoUpdate.amt = order.amt;
            orderList[index] = ordertoUpdate;
            res.status(200).json(ordertoUpdate);
        }
    });
}


