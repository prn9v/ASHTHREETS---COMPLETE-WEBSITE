const OrderItem = require('../models/orderItems.js');

async function getOrderItem(id) {
  try {
    console.log("Fetching order item with ID:", id);
    const orderItem = await OrderItem.findById(id);
    console.log("orderItem is: ",orderItem);
    
    if (!orderItem) {
      return res.status(404).json({ error: 'Order item not found.' });
    }
    
    return orderItem;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { getOrderItem };
