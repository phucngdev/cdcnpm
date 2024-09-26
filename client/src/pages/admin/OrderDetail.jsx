import React, { useEffect, useState } from "react";
import { Button, Steps, message } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneOrder, updateStatus } from "../../services/order.service";
import formatPrice from "../../utils/formatPrice";
import { formatTime } from "../../utils/formatTime";
import Pending from "../../components/user/animation/Pending";

const steps = [
  {
    title: "Chờ xử lý",
  },
  {
    title: "Xác nhận đơn hàng",
  },
  {
    title: "Vận chuyển",
  },
  {
    title: "Hoàn thành đơn hàng",
  },
];
const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [pending, setPending] = useState(false);

  const fetchData = async () => {
    setPending(true);
    const res = await dispatch(getOneOrder(id));
    console.log(res);

    if (res) {
      setPending(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { status, order, order_items } = useSelector(
    (state) => state.order.dataEdit
  );

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const handleUpdateStatus = async (status) => {};

  if (pending) return <Pending />;

  return (
    <>
      {status === 200 && (
        <>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold">
              Order Details #{order.order_id}
            </h3>
            <div>
              {order.status === "0" ? (
                <span className="text-red-600 bg-red-200 py-1 px-2 rounded">
                  Chờ xử lý
                </span>
              ) : order.status === "1" ? (
                <span className="text-blue-600 bg-blue-200 py-1 px-2 rounded">
                  Đã xác nhận
                </span>
              ) : order.status === "1" ? (
                <span className="text-yellow-600 bg-yellow-200 py-1 px-2 rounded">
                  Vận chuyển
                </span>
              ) : (
                <span className="text-green-600 bg-green-200 py-1 px-2 rounded">
                  Hoàn thành
                </span>
              )}
            </div>
          </div>
          <div className="my-3">
            Ngày tạo đơn: {formatTime(order.created_at)}
          </div>
          <Steps current={+order.status} items={items} />
          <div className="flex justify-between">
            <div className="w-[50%] flex flex-col gap-2">
              <h3 className="mt-3 text-lg font-semibold">
                Thông tin khách hàng
              </h3>
              <span>Họ và tên: {order.name}</span>
              <span>Email: {order.email}</span>
              <span>Số điện thoại: {order.phone}</span>
              <span>Ghi chú: {order.note}</span>
            </div>
            <div className="w-[50%] flex flex-col gap-2">
              <h3 className="mt-3 text-lg font-semibold">Địa chỉ giao hàng</h3>
              <span>Tỉnh - Thành phố: {order.city}</span>
              <span>Quận - Huyện: {order.district}</span>
              <span>Xã - Phường: {order.ward}</span>
              <span>Số nhà: {order.address}</span>
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Danh sách sản phẩm</h3>
              <h3 className="text-base">
                Tổng tiền đơn hàng:{" "}
                <span className="text-lg font-semibold text-red-500">
                  {formatPrice(order.total)}
                </span>
              </h3>
            </div>
            <div className="flex flex-col gap-2 p-3 bg-[#f8f9fb]">
              {order_items.map((od) => (
                <div
                  key={od.order_detail_id}
                  className="flex items-center justify-between"
                >
                  <img
                    className="w-[80px] h-[80px] object-cover"
                    src={od.thumbnail}
                    alt=""
                  />
                  <span className="w-[40%]">{od.product_name}</span>
                  <span>x{od.quantity}</span>
                  <span>{od.size_name}</span>
                  <span>{od.color_name}</span>
                  <span>{formatPrice(od.price)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-3">
            {order.status === "0" && (
              <Button type="button" className="bg-blue-500 hover:bg-blue-400">
                <span className="text-white">Xác nhận</span>
              </Button>
            )}
            {order.status === "1" && (
              <Button
                type="button"
                className="bg-yellow-500 hover:bg-yellow-400"
              >
                <span className="text-white">Vận chuyển</span>
              </Button>
            )}
            {order.status === "2" && (
              <Button type="button" className="bg-green-500 hover:bg-green-400">
                <span className="text-white">Hoàn thành</span>
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetail;
