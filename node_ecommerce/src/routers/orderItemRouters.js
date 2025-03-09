const express = require('express');
const router = express.Router();

const orderItemController = require('../controller/orderItemcontroller.js');
const authenticate = require('../middleware/authenticate.js');

router.get("/get/:id",authenticate,orderItemController.getOrderItem);

module.exports = router;