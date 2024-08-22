import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import formatPrice from "../../../utils/formatPrice";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { handleChangeQuantity } from "../../../services/cart.service";

const CartItem = ({ product, showModal, cart_id }) => {
  const dispatch = useDispatch();
  const handleChange = async (status) => {
    const data = {
      quantity: status === 1 ? product.quantity + 1 : product.quantity - 1,
    };
    const response = await dispatch(
      handleChangeQuantity(data, cart_id, product.cart_item_id)
    );
    console.log(response);
  };
  console.log(product);

  return (
    <>
      <div className="grid grid-cols-12 py-[7px]">
        <div className="flex gap-2 items-center mb-4 md:mb-0 col-span-12 md:col-span-6">
          <img
            className="w-[100px] h-[100px] object-cover"
            src={product.product.thumbnail}
            alt=""
          />
          <div className="flex flex-col items-start">
            <div>{product.product.product_name}</div>
            <div className="flex gap-1 items-center">
              <div>{product.colorSize.colors.color_name}</div>
              <div>/</div>
              <div>{product.size.size_name}</div>
            </div>
            <Button onClick={() => showModal(product)}>
              <span className="text-[#ff0000]">Xoá</span>
            </Button>
          </div>
        </div>
        <div className="font-bold text-[#ff0000] flex justify-center items-center col-span-4 md:col-span-2">
          {formatPrice(product.product.price)}
        </div>
        <div className="flex justify-center items-center col-span-4 md:col-span-2">
          <button
            className="px-2 border"
            type="button"
            onClick={() => handleChange(0)}
            disabled={product.quantity > 1 ? false : true}
          >
            <MinusOutlined />
          </button>
          <span className="w-8 text-center border">{product.quantity}</span>
          <button
            className="px-2 border"
            type="button"
            onClick={() => handleChange(1)}
          >
            <PlusOutlined />
          </button>
        </div>
        <div className="font-bold text-[#ff0000] flex justify-center items-center col-span-4 md:col-span-2">
          {formatPrice(product.quantity * product.product.price)}
        </div>
      </div>
    </>
  );
};

export default CartItem;
