import { useEffect, useState } from "react";

import { Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

const Dashboard = () => {
    const [items, setItems] = useState([]);

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

    return (
        <>
            <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Items List
                </Typography>
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
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(item.timestamp).toLocaleString()}
                                        </Typography>
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
