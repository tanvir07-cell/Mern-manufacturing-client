import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.init";
import Navbar from "../../shared/Navbar";

import { Outlet, Link, NavLink } from "react-router-dom";
import Footer from "../../shared/Footer";
import useToken from "../../hooks/useToken";
import useAdmin from "../../hooks/useAdmin";
import PageTitle from "../../shared/PageTitle";
import BackToTopButton from "../../shared/BackToTopButton";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  return (
    <div>
      <PageTitle title={"Dashboard"}></PageTitle>
      <Navbar>
        <div class="drawer drawer-mobile">
          <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content flex h-[100%] sm:h-[100%] flex-col items-center justify-center">
            {/* <!-- Page content here --> */}
            <div>
              <h1 className="text-center lg:text-2xl ">
                Hey,
                <span className="text-success font-bold tracking-widest">
                  {user?.email}
                </span>
                Welcome to Your dashboard
              </h1>
            </div>

            <Outlet></Outlet>
          </div>
          <div class="drawer-side">
            <label for="my-drawer-2" class="drawer-overlay"></label>
            <ul class="menu p-4 overflow-y-auto w-80 header  text-base-content">
              {/* <!-- Sidebar content here --> */}
              <li>
                <NavLink to="/dashboard/my-profile">My profile</NavLink>
              </li>

              {!admin && (
                <>
                  <li>
                    <NavLink to="/dashboard/add-review">Add a Review</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/my-orders">My Orders</NavLink>
                  </li>
                </>
              )}

              {admin && (
                <li>
                  <NavLink to="/dashboard/users">Make Admin</NavLink>
                </li>
              )}

              {admin && (
                <li>
                  <NavLink to="/dashboard/add-product">Add Product</NavLink>
                </li>
              )}
              {admin && (
                <li>
                  <NavLink to="/dashboard/manage-orders">Manage Orders</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
        <BackToTopButton></BackToTopButton>
      </Navbar>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
