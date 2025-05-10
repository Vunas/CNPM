import React from "react";
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
} from "@mui/icons-material";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import { logout } from "../../../api/auth";

const Navbar = () => {
  return (
    <div id="nav-bar">
      <input id="nav-toggle" type="checkbox" />

      <div id="nav-header">
        <a
          id="nav-title"
          href="https://codepen.io"
          target="_blank"
          rel="noopener noreferrer"
        >
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
          <Palette />
          <span>Account</span>
        </div>

        <div className="nav-button">
          <Link className="absolute w-full inset-0" to="/admin/product" />
          <Image />
          <span>Product</span>
        </div>
        <div className="nav-button">
          <Link className="absolute w-full inset-0" to="/admin/category" />
          <PushPin />
          <span>Category</span>
        </div>

        <hr />
        <div className="nav-button">
          <Favorite />
          <span>Following</span>
        </div>
        <div className="nav-button">
          <TrendingUp />
          <span>Trending</span>
        </div>
        <div className="nav-button">
          <Whatshot />
          <span>Challenges</span>
        </div>
        <div className="nav-button">
          <AutoFixHigh />
          <span>Spark</span>
        </div>
        <hr />
        <div className="nav-button">
          <Diamond />
          <span>Codepen Pro</span>
        </div>
        <div id="nav-content-highlight"></div>
      </div>

      <input id="nav-footer-toggle" type="checkbox" />

      <div id="nav-footer">
        <div id="nav-footer-heading">
          <div id="nav-footer-avatar">
            <img src="/src/assets/svg/avatar.svg" alt="Avatar" />
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
            <span id="nav-footer-subtitle">Admin</span>
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
