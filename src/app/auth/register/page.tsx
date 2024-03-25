"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import userRegister from "@/libs/userRegister";
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

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await userRegister(name, tel, email, password);
      await signIn("credentials", { email: email, password: password });

      router.push("/myreservation");
    } catch (error) {
      alert("Invalid registration. Please try again.");
    }
  };

  if (session) {
    router.push("/myreservation");
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
          Register
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="tel"
            label="Telephone"
            name="tel"
            type="tel"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            Register
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
