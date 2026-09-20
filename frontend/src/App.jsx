import Home from "./pages/home";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem storageKey="portfolio-theme">
      <TooltipProvider delayDuration={180}>
        <Home />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
