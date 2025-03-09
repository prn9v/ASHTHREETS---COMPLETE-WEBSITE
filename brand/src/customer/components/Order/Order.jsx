import { Grid } from "@mui/material";
import { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistory } from "../../../State/Order/Action";

const orderStatus = [
  { label: "On the way", value: "on-the-way" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" },
];

const Order = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  return (
    <div className="min-h-screen px-5 lg:px-20">
      <Grid
        container
        sx={{
          justifyContent: "space-between",
          padding: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Grid item xs={2.5}>
          <div className="min-h-40 shadow-lg bg-white p-5 sticky top-5 border border-black">
            <h1 className="font-bold text-lg">Filter</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">ORDER STATUS</h1>
              {orderStatus.map((option) => (
                <div className="flex items-center" key={option.value}>
                  <input
                    defaultValue={option.value}
                    type="checkbox"
                    className="w-4 h-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={option.value}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={9}>
          <div className="space-y-5">
            {order?.orderHistory?.length > 0 ? (
              order.orderHistory.flatMap(
                (orderItem) =>
                  orderItem.orderItems?.map((item) => (
                    <OrderCard key={item} item={item} />
                  )) || []
              )
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Order;
