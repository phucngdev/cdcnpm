import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../layouts/user/Header";
import Footer from "../../layouts/user/Footer";
import { useCookie } from "../../hooks/useCookie";
import MessageButton from "../../components/user/message/MessageButton";
import Cookies from "js-cookie";
import { message } from "antd";

const PublicRouter = () => {
  const navigate = useNavigate();

  const userDecode = useCookie("accessToken");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userDecode) {
      setUser(userDecode);
    }
  }, [userDecode]);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    setUser(null);
    navigate("/");
    message.success("Đăng xuất thành công");
  };

  return (
    <>
      <Header user={user} handleLogout={handleLogout} />
      <Outlet context={user} />
      <MessageButton user={user} />
      <Footer />
    </>
  );
};

export default PublicRouter;
