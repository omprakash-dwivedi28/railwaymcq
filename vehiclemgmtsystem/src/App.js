import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Component/login.jsx";

import Dashboard from "./Component/Dashboard.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" component={Login} />
          <Route path="/Dashboard" component={Dashboard} />
          {/* Add more routes for other pages of your application */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
