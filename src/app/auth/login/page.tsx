"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import {
  Box,
  Button,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand", 
  },
});

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const urlParams = useSearchParams();
  const callbackUrl = urlParams.get("callbackUrl") || "/myreservation";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signIn("credentials", { email: email, password: password });
    } catch (error) {
      alert("Invalid login. Please try again.");
    }

    router.push(callbackUrl);
  };

  if (session) {
    router.push(callbackUrl);
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="inherit"
          >
            Login
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
