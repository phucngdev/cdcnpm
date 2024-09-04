import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/logo.png";
import TopHeader from "../../components/user/header/TopHeader";
import MainNavigate from "../../components/user/header/MainNavigate";
import ProductsNavigation from "../../components/user/header/ProductsNavigation";
import HeaderMobile from "../../components/user/header/HeaderMobile";
import { useDispatch } from "react-redux";
import { getCart } from "../../services/cart.service";

const Header = ({ user, handleLogout }) => {
  return (
    <>
      <HeaderMobile user={user} handleLogout={handleLogout} />
      <TopHeader user={user} handleLogout={handleLogout} />
      <MainNavigate />
      <ProductsNavigation />
    </>
  );
};

export default Header;
