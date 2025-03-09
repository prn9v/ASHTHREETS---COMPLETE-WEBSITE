import React, { useEffect } from "react";
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

const RecentOrderView = () => {
  const dispatch = useDispatch();
  const { adminOrder } = useSelector((store) => store);

  const [anchorEl, setAnchorEl] = React.useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event,index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget
    setAnchorEl(newAnchorElArray);
  };
  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null
    setAnchorEl(newAnchorElArray);
  };

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div className=" p-10">
      <Card className="mt-2">
        <CardHeader title="All Orders" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell> */}
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder.orders?.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell align="left">
                    <AvatarGroup max={3} sx={{ justifyContent: "start" }}>
                      {item.orderItems.map((orderItem) => (
                        <Avatar src={orderItem?.product?.imageUrl}></Avatar>
                      ))}
                    </AvatarGroup>
                    <Avatar src={item.imageUrl} />
                  </TableCell> */}
                  {/* <TableCell align="left">
                    {item.orderItems.map((orderItem) => (
                      <p>{orderItem.product.title}</p>
                    ))}
                  </TableCell> */}
                  <TableCell align="left">{item._id}</TableCell>
                  <TableCell align="left">{item.totalDiscountedPrice}</TableCell>
                  <TableCell align="left">
                    <span
                      className={` text-white rounded-full px-5 py-3 ${
                        item.orderStatus === "CONFIRMED"
                          ? "bg-[green]"
                          : item.orderStatus === "SHIPPED"
                          ? "bg-[blue]"
                          : item.orderStatus === "PLACED"
                          ? "bg-[#24ef93]"
                          : item.orderStatus === "PENDING"
                          ? "bg-[grey]"
                          : "bg-[#2fee1e]"
                      }`}
                    >
                      {item.orderStatus}
                    </span>
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

export default RecentOrderView;
