import React, { useContext } from "react";
import { UserContextProvider } from "./context/userContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "../src/PrivateRoute";

import "./App.css";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import TaskDesc from "./pages/TaskDesc";

function App() {
  return (
    <>
      <UserContextProvider>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route
              path="/home"
              element={<ProtectedRoute component={<Home />} />}
            />
            <Route
              path="/taskdesc/:taskId"
              element={<ProtectedRoute component={<TaskDesc />} />}
            />
          </Routes>
        </Router>
      </UserContextProvider>
    </>
  );
}

export default App;

// <Route
//   path="/category"
//   element={<ProtectedRoute component={<Cateory />} />}
// />
// <Route
//   path="/myrecipes"
//   element={<ProtectedRoute component={<Recipe />} />}
// />
// {/* <Route
//   path="/favorites"
//   element={<ProtectedRoute component={<Myfavorites />} />}
// /> */}
// <Route
//   path="/recipedesc/:recipeId"
//   element={<ProtectedRoute component={<RecipeDesc />} />}
// />
// <Route
//   path="/home"
//   element={<ProtectedRoute component={<Home />} />}
// />
