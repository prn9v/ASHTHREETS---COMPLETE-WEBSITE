const orderService = require('../services/orderservices.js');

const getAllOrders = async (req, res) => {
    console.log("controller reached");
    try {
        const user = await req.user;
        console.log("controller reached");
        const allOrders = await orderService.getAllOrders(user._id); 
        console.log("All orders are: ", allOrders);
  
        // Send response with HTTP status code 200
        return res.status(200).send(allOrders);
    } catch (error) {
        console.error("Error in getAllOrders:", error.message);
    
        // Send error response with HTTP status code 500
        return res.status(500).send({ error: error.message });
    }
};

const createOrder = async (req, res) => {
    const user = await req.user; // Get the authenticated user
    try {
        const shippingAddress = req.body.address; // Extract the address from the body
        //  console.log("shipping address is: ",shippingAddress);
        let createdOrder = await orderService.createOrder(user, shippingAddress); // Pass the address to the service
        // console.log(createdOrder);
        return res.status(200).send(createdOrder);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


const findOrderById = async(req,res) => {
    const user = await req.user;
    try {
        let createdOrder = await orderService.findOrderById(req.params.id);
        return res.status(200).send(createdOrder);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

const orderHistory = async(req,res) => {
    const user = await req.user;
    try {
        let createdOrder = await orderService.userOrdersHistory(user._id);
        return res.status(200).send(createdOrder);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}


module.exports = { createOrder, findOrderById , orderHistory , getAllOrders};