
import { useState } from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import SignUpForm from "../../components/SignUpForm";
import LogInForm from "../../components/LogInForm";

const Auth = () => {
  const [registeredUser, setRegisteredUser] = useState(true);

  return (
    <>
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "row", position: "relative" }}>
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "326px", lg: "539px" },
            borderRadius: "40px",
            padding: "27px",
            backgroundColor: "#f1f1f1",
          }}
        >
          <CardContent>
            {/* Header Section */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" sx={{ fontWeight: "normal" }}>
                Welcome to{" "}
                <span style={{ color: "#1976d2", fontWeight: "bold" }}>Items</span>
              </Typography>

              {/* Sign In/Sign Up Toggle */}
              <Box sx={{ display: "flex", flexDirection: "column", fontSize: { xs: "13px", sm: "16px" } }}>
                {registeredUser ? (
                  <Box>
                    <Typography sx={{ color: "#8D8D8D" }}>No Account?</Typography>
                    <Button
                      sx={{ color: "#1976d2", padding: 0 }}
                      onClick={() => setRegisteredUser(!registeredUser)}
                    >
                      Sign up
                    </Button>
                  </Box>
                ) : (
                  <Box>
                    <Typography sx={{ color: "#8D8D8D" }}>Have an Account?</Typography>
                    <Button
                      sx={{ color: "#1976d2", padding: 0 }}
                      onClick={() => setRegisteredUser(!registeredUser)}
                    >
                      Login in
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Render SignIn/SignUp Form */}
            {registeredUser ? <LogInForm /> : <SignUpForm />}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Auth;
