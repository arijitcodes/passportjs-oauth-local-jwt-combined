import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Grid,
  Paper,
  useTheme,
} from "@mui/material";

const Profile = () => {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        {user ? (
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            }}
          >
            <Avatar
              alt={user.displayName}
              src={user.picture}
              sx={{ width: 100, height: 100, margin: "auto" }}
            />
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: theme.palette.text.primary }}
            >
              {user.displayName || "N/A"}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.primary }}
                >
                  <strong>First Name:</strong> {user.firstName || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.primary }}
                >
                  <strong>Last Name:</strong> {user.lastName || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.primary }}
                >
                  <strong>Email:</strong> {user.email || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.primary }}
                >
                  <strong>Email Verified:</strong>{" "}
                  {user.emailVerified ? "Yes" : "No"}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
