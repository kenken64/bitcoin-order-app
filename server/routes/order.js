module.exports = function(app,API_URL){
    orderList = [
        {
            id: 0,
            contactNo: "3242",
            name: "Kenneth",
            gender: "Male",
            dob: new Date(),
            orderDate: new Date(),
            orderType: 'Sell',
            orderUnit: 100,
            price: 30000,
            qrUrl: '',
            address: '',
            amt: 3000000
        },
        {
            id: 1,
            contactNo: "3242",
            name: "Kenneth",
            gender: "Female",
            dob: new Date(),
            orderDate: new Date(),
            orderType: 'Buy',
            orderUnit: 100,
            price: 10000,
            qrUrl: 'https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/22041032646/original/RgItugeuFVq91GFRfS4iNcUFzoOKjRuKjA.png',
            address: 'Singapore',
            amt: 1000000
        },
        {
            id: 2,
            contactNo: "3242",
            name: "Kenneth",
            gender: "Female",
            dob: new Date(),
            orderDate: new Date(),
            orderType: 'Buy',
            orderUnit: 100,
            price: 20000,
            qrUrl: 'https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/22041032646/original/RgItugeuFVq91GFRfS4iNcUFzoOKjRuKjA.png',
            address: 'Singapore',
            amt: 2000000
        }
    ];
    const BTC_API_URL = `${API_URL}/bitcoin`;

    app.post(BTC_API_URL, (req,res)=>{
        console.log("called insert!");
        let order = req.body;
        console.log(order);
        if(typeof(order) !=='undefined'){
            console.log(">>>>>" + order);
            order.id = orderList.length++;
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
            ordertoUpdate.price = order.price;
            ordertoUpdate.qrUrl = order.qrUrl;
            ordertoUpdate.address = order.address;
            ordertoUpdate.amt = order.amt;
            orderList[index] = ordertoUpdate;
            res.status(200).json(ordertoUpdate);
        }
    });
}


