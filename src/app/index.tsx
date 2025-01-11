import { ThemeProvider } from "@/context/theme";
import { BrowserRouter } from "react-router";
import Routes from "./routes";

type Props = {};

const App = (_props: Props) => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
