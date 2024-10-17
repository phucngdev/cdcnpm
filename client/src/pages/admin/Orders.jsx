import { Empty, Pagination } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/admin/order/Header";
import OrderItem from "../../components/admin/order/OrderItem";
import Overview from "../../components/admin/order/Overview";

const Orders = () => {
  const [page, setPage] = useState({
    page: 1,
    limit: 10,
    status: -1,
  });

  const orders = useSelector((state) => state.order.data);
  console.log("🚀 ~ Orders ~ orders:", orders);

  return (
    <>
      <Overview
        orders={orders}
        totalNewOrder={orders?.total}
        totalShiping={orders?.totalShip}
        totalActive={orders?.totalEquip}
      />
      <Header page={page} />
      {orders.status === 200 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {orders?.orders?.map((od) => (
              <OrderItem od={od} key={od.order_id} />
            ))}
          </div>
          <div className="flex w-full justify-center mt-7">
            <Pagination
              defaultCurrent={1}
              defaultPageSize={2}
              total={orders.totalPages}
              onChange={(page, limit) => {
                setPage({
                  page,
                  limit,
                });
              }}
            />
          </div>
        </>
      )}
      {orders.status === 404 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </>
  );
};

export default Orders;
