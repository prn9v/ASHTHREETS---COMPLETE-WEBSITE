const orderItemService = require('../services/orderItemService')

const getOrderItem = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
        return res.status(400).json({ error: 'Order item ID is required.' });
        }
        
        const fetchedOrderItem = await orderItemService.getOrderItem(id);
        return res.status(200).send(fetchedOrderItem);
    } catch (error) {
        // Catch any error and send an appropriate error message with a 500 status code
        return res.status(500).send({ error: error.message });
    }
};


module.exports = { getOrderItem };