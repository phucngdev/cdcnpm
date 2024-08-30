import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../layouts/user/Header";
import Footer from "../../layouts/user/Footer";
import { useCookie } from "../../hooks/useCookie";
import MessageButton from "../../components/user/message/MessageButton";

const PublicRouter = () => {
  const user = useCookie("accessToken");

  return (
    <>
      <Header user={user} />
      <Outlet context={user} />
      <MessageButton user={user} />
      <Footer />
    </>
  );
};

export default PublicRouter;
