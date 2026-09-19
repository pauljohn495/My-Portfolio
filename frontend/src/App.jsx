import Home from "./pages/home";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem storageKey="portfolio-theme">
      <TooltipProvider delayDuration={180}>
        <Home />
        <Toaster position="bottom-right" closeButton />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
