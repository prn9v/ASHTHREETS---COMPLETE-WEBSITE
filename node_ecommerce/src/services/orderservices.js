const Address = require("../models/addressmodel.js");
const OrderItem = require("../models/orderItems.js");
const Order = require("../models/ordermodel.js");
const cartService = require("../services/cartservice.js");


async function getAllOrders() {
  try {

    // Query to find all orders where the `user` field matches the provided userId
    console.log("reached here");
    const orders = await Order.find();
    // console.log("orders are: ",orders);
    return orders;
  } catch (error) {
    console.error("Error fetching user orders:", error.message);
    throw new Error("Unable to fetch user orders");
  }
}



const createOrder = async (user, shipAddress) => {
  try {
      let address;

      // Validate if shipAddress is provided
      if (!shipAddress) {
          throw new Error("Shipping address is missing.");
      }

      // Check if the shipping address has an existing _id
      if (shipAddress._id) {
          const existAddress = await Address.findById(shipAddress._id);
          if (!existAddress) {
              throw new Error("Address not found.");
          }
          address = existAddress;
      } else {
          // Create and save the address
          address = new Address(shipAddress);
          address.user = user._id;
          await address.save();

          // Add the address to the user's address list if not already present
          if (!user.address.includes(address._id)) {
              user.address.push(address._id);
              await user.save();
          }
      }

      // Get the user's cart
      const cart = await cartService.findUserCart(user._id);
      if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
          throw new Error("Cart is empty.");
      }

      const orderItems = [];

      // Iterate through cart items to create order items
      for (const item of cart.cartItems) {
          if (!item.product || !item.product.price || !item.product.discountedPrice) {
              throw new Error("Product information is incomplete.");
          }

          const orderItem = new OrderItem({
              price: item.product.price,
              product: item.product._id,
              quantity: item.quantity,
              size: item.size,
              userId: user._id,
              discountedPrice: item.product.discountedPrice,
          });

          const createdOrderItem = await orderItem.save();
          orderItems.push(createdOrderItem._id);
      }

      // Create the order with the collected order items and shipping address
      const createdOrder = new Order({
          user: user._id,
          orderItems,
          totalPrice: cart.totalPrice,
          totalDiscountedPrice: cart.totalDiscountedPrice,
          discount: cart.discount,
          totalItems: cart.totalItems,
          shippingAddress: address._id,
      });

      const savedOrder = await createdOrder.save();

      // Push the created order ID into the user's orders list
      if (!user.orders.includes(savedOrder._id)) {
          user.orders.push(savedOrder._id);
          await user.save(); // Save the user with the updated orders list
      }

      return savedOrder;
  } catch (error) {
      console.error("Error in createOrder: ", error.message);
      throw new Error("Order creation failed. " + error.message);
  }
};



async function placedOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "PLACED";
  order.paymentDetails.paymentStatus = "COMPLETED";

  return await order.save();
}

async function confirmedOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "CONFIRMED";

  return await order.save();
}

async function shippedOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "SHIPPED";

  return await order.save();
}

async function deliverOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "DELIVERED";

  return await order.save();
}

async function cancelledOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "CANCELLED";

  return await order.save();
}

async function findOrderById(orderId) {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");

  return order;
}

async function userOrdersHistory(userId) {
  try {
    const orders = await Order.find({ user: userId });
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

const deleteOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return { success: false, message: "Order not found" };
    }

    await Order.findByIdAndDelete(orderId);
    return { success: true, message: "Order deleted successfully" };
  } catch (error) {
    return { success: false, message: "Error deleting order", error };
  }
};


module.exports = {
  createOrder,
  placedOrder,
  confirmedOrder,
  shippedOrder,
  deliverOrder,
  cancelledOrder,
  findOrderById,
  userOrdersHistory,
  getAllOrders,
  deleteOrder,
};
