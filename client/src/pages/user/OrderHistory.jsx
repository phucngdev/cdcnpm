import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderByUser } from "../../services/order.service";
import { useParams } from "react-router-dom";
import Pending from "../../components/user/animation/Pending";
import { Helmet } from "react-helmet";
import Icon_Incart from "../../../public/icon_incart.svg";
import { formatTime } from "../../utils/formatTime";
import formatPrice from "../../utils/formatPrice";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [pending, setPending] = useState(false);

  const fetchData = async () => {
    setPending(true);
    await dispatch(getAllOrderByUser(id));
    setPending(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const data = useSelector((state) => state.order.data);
  console.log("🚀 ~ HistoryOrder ~ data:", data);

  if (pending) return <Pending />;

  return (
    <>
      <Helmet>
        <title>TEELAB - Lịch sử mua hàng</title>
      </Helmet>
      <div className="container mx-auto px-2 md:px-0">
        <h2 className="text-2xl font-light my-4">Lịch sử mua hàng</h2>
        <div className="border border-[#ebebeb] p-[7px]">
          {data?.orders?.length > 0 ? (
            <>
              {data?.orders?.map((item) => (
                <>
                  <div className="hover:shadow-lg cursor-pointer p-4">
                    <div className="flex items-center justify-between pt-4 pb-2">
                      <h3 className="">
                        Ngày đặt: {formatTime(item.created_at)}
                      </h3>
                      <h2 className="">
                        Trạng thái -{" "}
                        {item.status === "0"
                          ? "Chưa xác nhân"
                          : item?.status === "1"
                          ? "Đã xác nhận"
                          : item?.status === "2"
                          ? "Vận chuyển"
                          : item?.status === "3"
                          ? "Hoàn thành"
                          : "Trả hàng"}
                      </h2>
                    </div>
                    <div
                      key={item.order_id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex flex-col gap-4">
                        {item.details.map((p) => (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <img
                                src={p.product.thumbnail}
                                alt=""
                                className="size-16"
                              />
                              <div className="flex flex-col">
                                <div>{p.product.product_name}</div>
                                <div className="flex gap-1 items-center">
                                  <div>{p.color_size.color_name}</div>
                                  <div>/</div>
                                  <div>{p.color_size.size_name}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end pb-4 border-b">
                      Tổng số tiền({item.details.length} sản phẩm):{" "}
                      {formatPrice(item.total)}
                    </div>
                  </div>
                </>
              ))}
            </>
          ) : (
            <>
              <div className="flex flex-col justify-center items-center">
                <img className="w-20 m-[15px]" src={Icon_Incart} alt="" />
                <p className="mb-2">Bạn chưa có đơn hàng nào</p>
              </div>
            </>
          )}
        </div>
        {/* <CartBottom cart={cart} /> */}
      </div>
    </>
  );
};

export default OrderHistory;
