import { BrowserRouter } from "react-router";
import Routes from "./routes";

type Props = {};

const App = (_props: Props) => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default App;
