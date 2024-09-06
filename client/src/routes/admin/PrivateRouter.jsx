import React, { useEffect, useLayoutEffect, useState } from "react";
import Sidebar from "../../layouts/admin/SideBar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Nav from "../../layouts/admin/Nav";
import Footer from "../../layouts/admin/Footer";
import { useCookie } from "../../hooks/useCookie";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { checkRoleAdmin } from "../../services/auth.service";
import { LoadingOutlined } from "@ant-design/icons";

const PrivateRouter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDecode = useCookie("accessToken");
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkRole = async () => {
    const response = await dispatch(checkRoleAdmin());
    console.log(response);

    return response && response.payload.status;
  };

  useLayoutEffect(() => {
    const fetchRole = async () => {
      if (userDecode) {
        const status = await checkRole();
        console.log(status);

        if (status === 200) {
          setUser(userDecode);
          setRole(true);
          message.success(`Hello ${userDecode.username}`);
          navigate("/admin");
        } else {
          message.warning("Bạn không có quyền truy cập");
          navigate("/");
        }
      }

      setLoading(false);
    };

    fetchRole();
  }, [userDecode]);

  if (loading)
    return (
      <div className="fixed bg-[rgba(255,255,255,0.5)] text-3xl z-50 top-0 left-0 bottom-0 right-0 flex items-center justify-center">
        <LoadingOutlined />
      </div>
    );

  return (
    role && (
      <>
        <Sidebar />
        <Nav user={user} />
        <div className="flex overflow-hidden bg-white pt-16">
          <div
            className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
            id="sidebarBackdrop"
          />
          <main
            id="main-content"
            className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
          >
            <div className="pt-6 px-4">
              <Outlet context={user} />
            </div>
            <Footer />
          </main>
        </div>
      </>
    )
  );
};

export default PrivateRouter;
