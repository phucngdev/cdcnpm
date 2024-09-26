import React from "react";
import { message } from "antd";
import ClientMessage from "../message/ClientMessage";
import EmployeeMessage from "../message/EmployeeMessage";

const ListMessage = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <EmployeeMessage
          message={
            "Teelab xin chào, bạn đang quan tâm đến sản phẩm hay có bất kỳ thắc mắc nào có thể liên hệ tại đây hoặc qua email teelab@gmail.com để được giải đáp"
          }
        />
        <ClientMessage
          message={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, labore porro esse maxime eveniet sapiente quia magni, reprehenderit cupiditate accusamus doloremque mollitia eligendi optio nemo voluptates nam ducimus quae ab."
          }
        />
        <ClientMessage message={"Lorem"} />
      </div>
    </>
  );
};

export default ListMessage;
