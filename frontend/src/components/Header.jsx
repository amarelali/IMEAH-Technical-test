import { AppBar, Box, Toolbar, Typography, } from "@mui/material";


const logout = () => {
    localStorage.clear();
    setTimeout(() => {
        location.replace("/");
    }, 1000);
};

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" >
                    Items List
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="span" onClick={logout}
                        sx={{
                            cursor: 'pointer',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' },
                            marginRight: 2
                        }}
                    >
                        Log Out
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>

    )
}

export default Header;