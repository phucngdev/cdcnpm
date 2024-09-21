import { Button, message, Popconfirm } from "antd";
import React, { useMemo, useState } from "react";
import {
  EditOutlined,
  QuestionCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import formatPrice from "../../../../../utils/formatPrice";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  getAllProduct,
} from "../../../../../services/product.service";
import Pending from "../../../../user/animation/Pending";

const ItemProduct = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  const quantity = useMemo(() => {
    return product.option.reduce((total, s) => {
      return (
        total + s.sizes.reduce((subTotal, size) => subTotal + size.quantity, 0)
      );
    }, 0);
  }, [product]);

  const handleDelete = async (id) => {
    try {
      setPending(true);
      const response = await dispatch(deleteProduct(id));
      if (response.payload.status === 200) {
        message.success("Xoá thành công");
        await dispatch(getAllProduct());
      }
      setPending(false);
    } catch (error) {
      setPending(false);
      console.error(error);
      message.error(error.message);
    }
  };

  if (pending) return <Pending />;

  return (
    <>
      <div className="flex flex-col max-h-[100dvh] overflow-scroll">
        <div className="flex items-center justify-between gap-x-2 text-center p-2 rounded-lg shadow hover:shadow-lg cursor-pointer">
          <img
            src={product?.thumbnail}
            alt={product?.product_name}
            className="w-[10%] h-full object-cover"
          />
          <div className="w-[30%]">{product?.product_name}</div>
          <div className="w-[10%]">
            <span className="px-4 py-2 bg-green-200 rounded-2xl">
              {quantity}
            </span>
          </div>
          <div className="w-[10%]">{product.sold || 0}</div>
          <div className="w-[10%]">{formatPrice(product.price)}</div>
          <div className="w-[10%]">
            {moment(product?.created_at).format("DD-MM-YYYY")}
          </div>
          <div className="flex-1 flex justify-center items-center gap-3">
            <Button
              onClick={() =>
                navigate(`/admin/chinh-sua-san-pham/${product.product_id}`)
              }
              className="flex items-center justify-center"
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Xoá sản phẩm"
              description="Bạn chắc chắn muốn xoá sản phẩm?"
              placement="left"
              onConfirm={() => handleDelete(product.product_id)}
              okType="danger"
              icon={<QuestionCircleOutlined className="text-red-600" />}
            >
              <Button
                danger
                className=" text-white flex items-center justify-center"
              >
                <StopOutlined />
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemProduct;
