'use client';
import { createTheme, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand, sans-serif",
  },
});

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProviderComponent = ({ children }: ThemeProviderProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderComponent;
