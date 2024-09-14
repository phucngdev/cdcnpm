import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Avatar, Popover, Button, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CartList from "./CartList";
import CartEmpty from "./CartEmpty";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/auth.service";
import Pending from "../animation/Pending";

const CartAndUserMenu = ({ user, setUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.data);
  const [pending, setPending] = useState(false);

  const firstName = useMemo(() => {
    if (user) {
      return user.username[0];
    }
  }, []);

  const handleLogout = async () => {
    setPending(true);
    const response = await dispatch(logout());
    if (response.payload.status === 200) {
      navigate("/");
      message.success("Đăng xuất thành công");
      setUser(null);
    } else {
      message.error("Đăng xuất thất bại");
    }
    setPending(false);
  };

  if (pending) return <Pending />;

  return (
    <>
      <div className="h-full w-10 relative group flex items-center justify-center">
        <Link to="/gio-hang" className="m-0">
          <Badge count={cart?.items?.length} showZero>
            <Avatar shape="square" icon={<ShoppingCartOutlined />} />
          </Badge>
        </Link>
        <div className="group-hover:block rounded-sm shadow-lg bg-white absolute z-[99] top-[100%] right-0 hidden">
          <div className="w-[400px] max-h-[500px] overflow-scroll flex flex-col items-center text-center p-2">
            {cart?.items?.length > 0 ? <CartList cart={cart} /> : <CartEmpty />}
          </div>
        </div>
      </div>
      <div className="w-10 h-10 flex items-center justify-center">
        <Popover
          content={
            <>
              <div className="flex flex-col gap-2">
                <Button
                  type="primary"
                  onClick={() => navigate("/kiem-tra-don-hang")}
                >
                  Kiểm tra đơn hàng
                </Button>
                <Button
                  type="primary"
                  onClick={() => navigate(`/lich-su-mua-hang/${user.user_id}`)}
                >
                  Lịch sử mua hàng
                </Button>
                <Button onClick={() => handleLogout()}>Đăng xuất</Button>
              </div>
            </>
          }
          title="Chức năng"
          trigger="hover"
        >
          {user.avatar ? (
            <Avatar
              src={user?.avatar}
              className="w-full h-full rounded-full object-cover cursor-pointer"
            />
          ) : (
            <Avatar className="w-full h-full bg-[#fde3cf] text-[#f56a00] text-lg cursor-pointer rounded-full object-cover">
              {firstName}
            </Avatar>
          )}
        </Popover>
      </div>
    </>
  );
};

export default CartAndUserMenu;
