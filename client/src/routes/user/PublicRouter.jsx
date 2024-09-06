import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../layouts/user/Header";
import Footer from "../../layouts/user/Footer";
import { useCookie } from "../../hooks/useCookie";
import MessageButton from "../../components/user/message/MessageButton";
import { useDispatch } from "react-redux";
import { getAllProduct } from "../../services/product.service";
import { getAllCategory } from "../../services/category.service";
import { getCart } from "../../services/cart.service";

const PublicRouter = () => {
  const userDecode = useCookie("accessToken");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const fetchData = async () => {
    const promises = [
      dispatch(getAllProduct({ page: 0, limit: 0 })),
      dispatch(getAllCategory()),
    ];
    if (user) {
      promises.push(dispatch(getCart(user.user_id)));
    }
    await Promise.all(promises);
  };

  useEffect(() => {
    if (userDecode) {
      setUser(userDecode);
    }
  }, [userDecode]);

  useEffect(() => {
    fetchData();
  }, []);

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
