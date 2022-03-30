import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../components/Home";
import Statistics from "../../components/Statistics";
import { Routes as RoutesEnum } from "../../enums/Routes";

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path={RoutesEnum.Home} element={<Home />} />
        <Route path={RoutesEnum.Statistics} element={<Statistics />} />
      </Routes>
    </Router>
  );
}
