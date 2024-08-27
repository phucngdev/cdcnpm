import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/user/message/Header";
import Infomation from "../../components/user/message/Infomation";
import FirstMessage from "../../components/user/message/FirstMessage";
import ClientMessage from "../../components/user/message/ClientMessage";
import InputBottom from "../../components/user/message/InputBottom";
import { io } from "socket.io-client";

const Message = () => {
  const { id } = useParams();
  const [socket, setSocket] = useState(null);
  const [send, setSend] = useState(false);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket === null) return;

    socket.emit("sendMessage", { message: "abc", sender: "sender" });
  }, [send]);

  return (
    <>
      <div className="container mx-auto">
        <Header />
        <Infomation />
        <FirstMessage />
        <ClientMessage
          message={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla numquam, delectus debitis soluta totam quas iste officiis unde provident dolor, voluptatibus harum quasi eligendi nostrum natus explicabo error inventore perspiciatis?"
          }
        />
        <InputBottom setSend={setSend} />
      </div>
    </>
  );
};

export default Message;
