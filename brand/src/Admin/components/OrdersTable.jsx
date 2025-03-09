import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, AvatarGroup, Button, Card, CardHeader } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  getOrders,
  shipOrder,
} from "../../State/Admin/Orders/Action";

const OrdersTable = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.adminOrder);
  
  const [anchorEl, setAnchorEl] = useState([]);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleClick = (event, index) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = event.currentTarget;
    setAnchorEl(newAnchorEl);
  };

  const handleClose = (index) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = null;
    setAnchorEl(newAnchorEl);
  };

  const handleUpdateOrder = async (orderId, action) => {
    if (action === "confirm") await dispatch(confirmOrder(orderId));
    else if (action === "ship") await dispatch(shipOrder(orderId));
    else if (action === "deliver") await dispatch(deliveredOrder(orderId));
    
    dispatch(getOrders()); // Fetch updated orders
    handleClose();
    window.location.reload(); 
  };

  const handleDeleteOrder = async (orderId) => {
    await dispatch(deleteOrder(orderId));
    dispatch(getOrders());
    window.location.reload();
  };

  return (
    <div className="p-10">
      <Card className="mt-2">
        <CardHeader title="All Orders" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Update</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((item, index) => (
                <TableRow key={item._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="left">{item._id}</TableCell>
                  <TableCell align="left">{item.totalDiscountedPrice}</TableCell>
                  <TableCell align="left">
                    <span
                      className={`text-white rounded-full px-5 py-3 ${
                        item.orderStatus === "CONFIRMED" ? "bg-green-500" :
                        item.orderStatus === "SHIPPED" ? "bg-blue-500" :
                        item.orderStatus === "PLACED" ? "bg-green-300" :
                        item.orderStatus === "PENDING" ? "bg-gray-500" :
                        "bg-green-700"
                      }`}
                    >
                      {item.orderStatus}
                    </span>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      aria-controls={`basic-menu-${item._id}`}
                      aria-haspopup="true"
                      aria-expanded={Boolean(anchorEl[index])}
                      onClick={(event) => handleClick(event, index)}
                    >
                      Update
                    </Button>
                    <Menu
                      id={`basic-menu-${item._id}`}
                      anchorEl={anchorEl[index]}
                      open={Boolean(anchorEl[index])}
                      onClose={() => handleClose(index)}
                      MenuListProps={{ "aria-labelledby": "basic-button" }}
                    >
                      <MenuItem onClick={() => handleUpdateOrder(item._id, "confirm")}>
                        CONFIRMED ORDER
                      </MenuItem>
                      <MenuItem onClick={() => handleUpdateOrder(item._id, "ship")}>
                        SHIPPED ORDER
                      </MenuItem>
                      <MenuItem onClick={() => handleUpdateOrder(item._id, "deliver")}>
                        DELIVERED ORDER
                      </MenuItem>
                    </Menu>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => handleDeleteOrder(item._id)}
                      variant="outlined"
                      color="warning"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrdersTable;
