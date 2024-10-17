import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOneOrder } from "../../services/order.service";
import { Helmet } from "react-helmet";
import formatPrice from "../../utils/formatPrice";
import { Button, message } from "antd";
import { formatTime } from "../../utils/formatTime";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Pending from "../../components/user/animation/Pending";

const CheckOrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);

  const fetchData = async () => {
    setPending(true);
    const response = await dispatch(getOneOrder(id));
    if (response.payload.status !== 200) {
      message.error("Không tải được đơn hàng, vui lòng thử lại");
    }
    setPending(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const order = useSelector((state) => state.order.dataEdit);
  console.log("🚀 ~ CheckOrderDetail ~ order:", order);

  const listItem = order?.order_items?.map((product, index) => (
    <div key={index} className="grid grid-cols-12 items-center py-[7px]">
      <div className="col-span-9 flex gap-2 items-center">
        <img
          className="w-[100px] h-[100px] object-cover"
          src={product.thumbnail}
          alt=""
        />
        <div className="flex flex-col items-start">
          <div>{product.product_name}</div>
          <div className="flex gap-1 items-center">
            <div>{product.color_name}</div>
            <div>/</div>
            <div>{product.size_name}</div>
          </div>
        </div>
      </div>
      <div className="font-bold text-[#ff0000] text-center col-span-2">
        {formatPrice(product.price)}
      </div>
      <div className="col-span-1 text-center">x{product?.quantity}</div>
    </div>
  ));

  if (pending) return <Pending />;

  return (
    <>
      <Helmet>
        <title>Kiểm tra đơn hàng - TEELAB</title>
      </Helmet>
      <div className="container mx-auto px-2 mt-[50px] md:mt-5">
        <h2 className="font-semibold text-xl mb-2">
          Đơn hàng của bạn -{" "}
          {order?.order?.status === "0"
            ? "Chưa xác nhân"
            : order?.status === "1"
            ? "Đã xác nhận"
            : order?.status === "2"
            ? "Vận chuyển"
            : order?.status === "3"
            ? "Hoàn thành"
            : "Trả hàng"}
        </h2>
        <div className="flex flex-col md:flex-row md:items-center justify-between my-2">
          <h3 className="text-lg flex items-center gap-2">
            Mã đơn hàng:
            <span className="font-bold text-xl">{id}</span>
          </h3>
          <h3 className="mt-2 md:mt-0 text-lg flex items-center gap-2">
            Tổng giá trị đơn hàng:{" "}
            <span className="font-bold text-xl text-[#ff0000]">
              {formatPrice(order?.order?.total)}
            </span>
          </h3>
        </div>
        <div className="">
          Thời gian đặt hàng: {formatTime(order?.order?.created_at)}
        </div>
        <hr />
        <div className="flex flex-col md:flex-row gap-10 md:p-3 mt-10 md:mt-0">
          <div className="flex flex-col gap-3 md:pe-10 md:border-e">
            <div className="flex items-center gap-2 ">
              <ExclamationCircleOutlined />
              <h3 className="">Thông tin nhận hàng</h3>
            </div>
            <div className="flex flex-col gap-2 ">
              <span>Họ và tên: {order?.order?.username}</span>
              <hr />
              <span>Thanh toán: {order?.order?.transaction}</span>
              <hr />
              <span>Email: {order?.order?.email}</span>
              <hr />
              <span>Số điện thoại: {order?.order?.phone}</span>
              <hr />
              <span>Đia chỉ: {order?.order?.address}</span>
              <hr />
              <span>Tỉnh thành: {order?.order?.city}</span>
              <hr />
              <span>Quận huyện: {order?.order?.district}</span>
              <hr />
              <span>Phường xã: {order?.order?.ward}</span>
              <hr />
              <span>Ghi chú: {order?.order?.note}</span>
              <hr />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-2">
              <ExclamationCircleOutlined />
              <h3 className="">Thông tin sản phẩm</h3>
            </div>
            <div className="flex flex-col gap-2">{listItem}</div>
          </div>
        </div>
        {order?.status === "successfully" ? (
          <div className="flex justify-end">
            <Button>Yêu cầu trả hàng</Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default CheckOrderDetail;
