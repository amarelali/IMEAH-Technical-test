import { useEffect, useState } from "react";

import { Button, Card, CardContent, DialogActions, DialogTitle, TextField, Typography } from "@mui/material";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { CustomDialog } from "../components/ui/CustomDialog";
import { useSelector } from "react-redux";
import CustomButton from "../components/ui/CustomButton";
import { toast } from 'react-toastify';


const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false); // State to manage dialog open/close
    const [item, setItem] = useState({ title: "", description: "" }); // State for new item
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);

    // Fetch items from the backend
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://localhost:3000/items");
                console.log("response", response);
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();

    }, []);

    // Handle input changes for the new item
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItem((prevItem) => ({
            ...prevItem,
            [name]: value,
        }));
    };

    // Handle submitting the new item form
    const handleCreateItem = async () => {
        try {
            const response = await axios.post("http://localhost:3000/items", item);
            toast.success('Item created successfully!')
            setItems((prevItems) => [...prevItems, response.data]);
            setItem({ title: "", description: "" }); // Reset form
            setOpenDialog(false); // Close the dialog
        } catch (error) {
            toast.error("Error creating successfully");
            console.error("Error creating item:", error);
        }
    };
    //
    const handleUpdateItem = async () => {
        try {
            setIsLoading(true);
            const response = await axios.put(`http://localhost:3000/items/${currentItem.id}`, item);
            toast.success("Item updated successfully");
            console.log("Item updated:", response.data);
            setItems((prevItems) => {
                const newArray = prevItems.map((prevItem) => {
                    if (prevItem.id === currentItem.id) {
                        return { ...prevItem, ...item }
                    }
                    return prevItem
                });
                return newArray;
            });
            setIsLoading(false);
            setItem({ title: "", description: "" }); // Reset form
            setOpenDialog(false); // Close the dialog
        } catch (error) {
            setIsLoading(false);
            toast.error("Error updating item");
            console.error("Error updating item:", error);
        }
    };

    // Handle opening and closing the dialog
    const handleDialogOpen = (item = null) => {
        if (item) {
            setCurrentItem(item);
            setItem({ title: item.title, description: item.description });
        } else {
            setCurrentItem(null);
            setItem({ title: "", description: "" });
        }
        setOpenDialog(true);
    };
    const handleDialogClose = () => { setOpenDialog(false); setTimeout(() => { setCurrentItem(null) }, 100) }

    return (
        <>
            <CustomDialog title={currentItem ? "Update Item" : "Create a New Item"} isOpened={openDialog} onClose={handleDialogClose}>
                <DialogTitle>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        variant="outlined"
                        name="title"
                        value={item.title}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        variant="outlined"
                        name="description"
                        value={item.description}
                        onChange={handleInputChange}
                    />
                </DialogTitle>
                <DialogActions>
                    <CustomButton onClick={handleDialogClose} rest={{ "color": "#9289a3" }}> Cancel </CustomButton>
                    <CustomButton onClick={currentItem ? handleUpdateItem : handleCreateItem} isLoading={isLoading} rest={{ "color": "primary" }} > {currentItem ? "Update" : "Create"}</CustomButton>
                </DialogActions>
            </CustomDialog>
            <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Items List
                </Typography>
                {/* Button to open the "Create Item" dialog */}
                <Button variant="contained" color="primary" onClick={() => handleDialogOpen()} sx={{ marginBottom: 2 }}>
                    Create Item
                </Button>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                        {items.map((item, index) => (
                            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                                <Card sx={{ minHeight: 150 }}>
                                    <CardContent>
                                        <Typography variant="h6" color="primary" gutterBottom>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" paragraph>
                                            {item.description}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" >
                                            {new Date(item.timestamp).toLocaleString()}
                                        </Typography>
                                        {/* Update button for each item */}
                                        <Box width={"fullWidth"}>
                                            <CustomButton
                                                onClick={() => { handleDialogOpen(item); }}>
                                                Update
                                            </CustomButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default Dashboard;
