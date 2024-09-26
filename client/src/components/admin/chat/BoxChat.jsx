import {
  AudioOutlined,
  ExclamationCircleOutlined,
  HeartOutlined,
  PhoneOutlined,
  PictureOutlined,
  SmileOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input, Tooltip } from "antd";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useCookie } from "../../../hooks/useCookie";
import Header from "./layout/Header";
import BottomInput from "./layout/BottomInput";
import ListMessage from "./layout/ListMessage";
import { useSelector } from "react-redux";

const BoxChat = () => {
  const user = useCookie("user_info", false);
  const [content, setContent] = useState("");
  const data_user = useSelector((state) => state.message.dataEdit);
  console.log("data_user ", data_user);

  return (
    <>
      <Helmet>
        <title>Message - Chats</title>
      </Helmet>
      <div className="lg:flex-1 lg:px-3 lg:pt-4 relative">
        <Header user={user} />
        <ListMessage />
        <BottomInput content={content} setContent={setContent} />
      </div>
    </>
  );
};

export default BoxChat;
