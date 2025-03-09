import { Button, Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../State/Order/Action";

const DeliveryAddressForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [savedAddress, setSavedAddress] = useState(null);

    useEffect(() => {
        // Retrieve saved address from local storage
        const storedAddress = JSON.parse(localStorage.getItem("deliveryAddress"));
        if (storedAddress) {
            setSavedAddress(storedAddress);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const address = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            streetAddress: data.get("address"),
            city: data.get("city"),
            state: data.get("state"),
            zipCode: data.get("zip"),
            mobile: data.get("phoneNumber"),
        };

        // Validation
        if (!address.firstName || !address.streetAddress || !address.city || !address.state || !address.zipCode || !address.mobile) {
            navigate(`/checkout?step=2`);
            return;
        }

        // Store address in local storage
        localStorage.setItem("deliveryAddress", JSON.stringify(address));

        const orderData = { address };

        try {
            const response = await dispatch(createOrder(orderData));
            if (response) {
                navigate(`/checkout?step=3&order_id=${response._id}`);
            } else {
                console.error("Order creation response missing orderId");
            }
        } catch (error) {
            console.error("Order creation failed:", error);
        }
    };

    return (
        <div className="h-screen">
            <Grid container spacing={4}>
                <Grid item xs={12} lg={5} className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll">
                    <div className="p-5 py-7 border-b cursor-pointer">
                        {/* Pass previously entered address to AddressCard */}
                        {savedAddress ? <AddressCard address={savedAddress} /> : <p>No saved address found.</p>}
                    </div>
                </Grid>

                <Grid item xs={12} lg={7} style={{ position: "relative", top: "-36px" }}>
                    <Box className="border rounded-s-md shadow-md p-5">
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        fullWidth
                                        autoComplete="given-name"
                                        defaultValue={savedAddress?.firstName || ""}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        fullWidth
                                        autoComplete="family-name"
                                        defaultValue={savedAddress?.lastName || ""}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="address"
                                        name="address"
                                        label="Address"
                                        fullWidth
                                        autoComplete="shipping street-address"
                                        multiline
                                        rows={6}
                                        defaultValue={savedAddress?.streetAddress || ""}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="city"
                                        name="city"
                                        label="City"
                                        fullWidth
                                        autoComplete="address-level2"
                                        defaultValue={savedAddress?.city || ""}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="state"
                                        name="state"
                                        label="State/Province/Region"
                                        fullWidth
                                        autoComplete="address-level1"
                                        defaultValue={savedAddress?.state || ""}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="zip"
                                        name="zip"
                                        label="Zip / Postal-Code"
                                        fullWidth
                                        autoComplete="postal-code"
                                        defaultValue={savedAddress?.zipCode || ""}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        label="Phone Number"
                                        fullWidth
                                        autoComplete="tel"
                                        defaultValue={savedAddress?.mobile || ""}
                                    />
                                </Grid>

                                <Grid item xs={10} sm={4}>
                                    <Button sx={{ mt: 2, bgcolor: "#4CAF50", color: "white" }} size="large" variant="contained" type="submit">
                                        Deliver Here
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default DeliveryAddressForm;
