import React, { useEffect } from "react";
import {
  Palette,
  Image,
  PushPin,
  Favorite,
  TrendingUp,
  Whatshot,
  AutoFixHigh,
  Diamond,
  Code,
  ExpandLess,
  Logout,
  Face,
  AccountCircle,
  ShoppingBag,
  Category,
  Restaurant,
  TableRestaurant,
  BarChart,
  Feedback,
  ListAlt,
} from "@mui/icons-material";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import { logout } from "../../../api/auth";
import { useState } from "react";

const Navbar = () => {
  const [avatar, setAvatar] = useState("/assets/svg/avatar.svg");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        localStorage.setItem("avatar", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    } else {
      setAvatar("/assets/svg/avatar.svg");
    }
  }, []);

  return (
    <div id="nav-bar">
      <input id="nav-toggle" type="checkbox" />

      <div id="nav-header">
        <a id="nav-title" >
          ADMIN
        </a>
        <label htmlFor="nav-toggle">
          <span id="nav-toggle-burger"></span>
        </label>
        <hr />
      </div>

      <div id="nav-content">
        <div className="nav-button">
          <Link className="absolute w-full inset-0" to="/admin/account" />
          <AccountCircle sx={{ fontSize: 28 }} />
          <span>Account</span>
        </div>

        <div className="nav-button">
          <Link className="absolute w-full inset-0" to="/admin/product" />
          <ShoppingBag sx={{ fontSize: 28 }} />
          <span>Product</span>
        </div>

        <div className="nav-button">
          <Link className="absolute w-full inset-0" to="/admin/category" />
          <Category sx={{ fontSize: 28 }} />
          <span>Category</span>
        </div>

        <div className="nav-button">
          <Link className="absolute w-full inset-0" to="/admin/restaurant" />
          <Restaurant sx={{ fontSize: 28 }} />
          <span>Restaurant</span>
        </div>

        <div className="nav-button">
          <Link
            className="absolute w-full inset-0"
            to="/admin/restauranttable"
          />
          <TableRestaurant sx={{ fontSize: 28 }} />
          <span>Restaurant Table</span>
        </div>

        <div className="nav-button">
          <Link className="absolute w-full inset-0" to="/admin/order" />
          <ListAlt sx={{ fontSize: 28 }} />
          <span>Order</span>
        </div>

        <div className="nav-button">
          <Link className="absolute w-full inset-0" to="/admin/feedback" />
          <Feedback sx={{ fontSize: 28 }} />
          <span>feedback</span>
        </div>

        <div className="nav-button">
          <Link className="absolute w-full inset-0" to="/admin/statistics" />
          <BarChart sx={{ fontSize: 28 }} />
          <span>Statistics</span>
        </div>

        <div id="nav-content-highlight"></div>
      </div>

      <input id="nav-footer-toggle" type="checkbox" />

      <div id="nav-footer">
        <div id="nav-footer-heading">
          <div id="nav-footer-avatar">
            <img
              src={avatar}
              alt="Avatar"
              title="change avatar?"
              className="cursor-pointer"
              onClick={() => document.getElementById("avatarInput").click()}
            />
            <input
              type="file"
              id="avatarInput"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          <div id="nav-footer-titlebox">
            <a
              id="nav-footer-title"
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              Admin
            </a>
            {/* <span id="nav-footer-subtitle">Admin</span> */}
          </div>
          <label htmlFor="nav-footer-toggle">
            <ExpandLess />
          </label>
        </div>
        <div id="nav-footer-content">
          <div
            className="logout"
            onClick={() => {
              logout();
            }}
          >
            <Logout />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
