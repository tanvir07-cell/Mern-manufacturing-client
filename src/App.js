import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./shared/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Services from "./pages/Services";
import { useEffect, useState } from "react";

// for aos animation:
import AOS from "aos";
import "aos/dist/aos.css";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyProfile from "./pages/Dashboard/MyProfile";
import NotFound from "./shared/NotFound";
import Blog from "./shared/Blog";

import Parts from "./pages/parts/Parts";
import Part from "./pages/parts/Part";
import AllParts from "./pages/parts/AllParts";
import SinglePart from "./pages/parts/SinglePart";
import RequireAuth from "./shared/RequireAuth";
import AddReview from "./pages/Dashboard/AddReview";
import MyOrders from "./pages/Dashboard/MyOrders";
import EditProfile from "./pages/Dashboard/EditProfile";
import ScrollToTop from "react-scroll-to-top";
import BackToTopButton from "./shared/BackToTopButton";
import RequireAdmin from "./shared/RequireAdmin";
import Users from "./pages/Dashboard/Users";
import AddProduct from "./pages/Dashboard/AddProduct";
import PaymentProduct from "./pages/Dashboard/PaymentProduct";
import ManageAllOrders from "./pages/Dashboard/ManageAllOrders";

function App() {
  // for top loading bar:
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const spinner = document.getElementById("spinner");

  // for aos animation:
  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    if (spinner) {
      setTimeout(() => {
        spinner.style.display = "none";
        setLoading(false);
      }, 2000);
    }
  }, [spinner]);
  return (
    !loading && (
      <div className="App   ">
        {/* <Navbar></Navbar> */}

        <Routes>
          <Route path="/" element={<Home></Home>}></Route>

          <Route
            path="/login"
            element={
              <Login setProgress={setProgress} progress={progress}></Login>
            }
          ></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>

          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard></Dashboard>
              </RequireAuth>
            }
          >
            {/* nested route */}
            <Route path="my-profile" element={<MyProfile></MyProfile>}></Route>
            <Route path="add-review" element={<AddReview></AddReview>}></Route>
            <Route path="my-orders" element={<MyOrders></MyOrders>}></Route>
            <Route
              path="my-profile/edit-profile"
              element={<EditProfile></EditProfile>}
            ></Route>
            <Route
              path="users"
              element={
                <RequireAdmin>
                  <Users></Users>
                </RequireAdmin>
              }
            ></Route>

            <Route
              path="add-product"
              element={
                <RequireAdmin>
                  <AddProduct></AddProduct>
                </RequireAdmin>
              }
            ></Route>

            <Route
              path="manage-orders"
              element={
                <RequireAdmin>
                  <ManageAllOrders></ManageAllOrders>
                </RequireAdmin>
              }
            ></Route>

            <Route
              path="payment/:id"
              element={<PaymentProduct></PaymentProduct>}
            ></Route>
          </Route>

          <Route path="/blogs" element={<Blog></Blog>}></Route>
          <Route path="/parts" element={<AllParts></AllParts>}></Route>
          <Route
            path="/part/:id"
            element={
              <RequireAuth>
                <SinglePart></SinglePart>
              </RequireAuth>
            }
          ></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>

          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </div>
    )
  );
}

export default App;
