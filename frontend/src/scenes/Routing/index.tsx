import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Routes as RoutesEnum } from "../../enums/Routes";
import Home from "../Home";

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path={RoutesEnum.Home} element={<Home />} />
      </Routes>
    </Router>
  );
}
