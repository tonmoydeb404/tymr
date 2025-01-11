import { Toaster } from "@/components/ui/sonner";
import { AppProvider } from "@/context/app";
import { ThemeProvider } from "@/context/theme";
import { BrowserRouter } from "react-router";
import Routes from "./routes";

type Props = {};

const App = (_props: Props) => {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <Toaster />
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
