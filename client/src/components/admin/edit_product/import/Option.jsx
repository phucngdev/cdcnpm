import { Button, Checkbox, Image, message, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addNewSize,
  getOneProductImport,
  importQuantityProduct,
  updateActiveProduct,
} from "../../../../services/product.service";

const Option = ({ product_id, status, options, setModalOpen, modalOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sizeChanges, setSizeChanges] = useState([]);
  const [newSizes, setNewSizes] = useState({});
  const [modalNewSize, setModalNewSize] = useState(false);
  const [openSale, setOpenSale] = useState(false);
  const [pending, setPending] = useState(false);

  const handleSelectNewSize = (size) => {
    setModalNewSize(true);
    setNewSizes({
      color_name: size.color_name,
      color_id: size.color_id,
      image: size.image,
      size_name: "",
      quantity: 0,
    });
  };

  const handleChangeNewSize = (e) => {
    const { name, value } = e.target;
    setNewSizes((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveNewSize = async () => {
    if (newSizes.size_name.trim() === "" || newSizes.quantity <= 0) {
      message.warning("Vui lòng nhập đủ thông tin");
      return;
    }

    const newSize = {
      color_id: newSizes.color_id,
      size_name: newSizes.size_name,
      quantity: +newSizes.quantity,
    };
    setPending(true);
    const response = await dispatch(
      addNewSize({ id: product_id, data: newSize })
    );
    if (response.payload.status === 201) {
      await dispatch(getOneProductImport(product_id));
      message.success("Thêm size mới thành công");
      setNewSizes({});
    } else {
      message.error("Thêm size mới thất bại");
    }
    setPending(false);
    setModalNewSize(false);
  };

  const handleChange = (size_id, field, value) => {
    setSizeChanges((prev) => {
      const existingSize = prev.find((item) => item.size_id === size_id);
      if (existingSize) {
        return prev.map((item) =>
          item.size_id === size_id ? { ...item, [field]: value } : item
        );
      } else {
        return [...prev, { size_id, [field]: value }];
      }
    });
  };

  const handleSave = async () => {
    if (sizeChanges.length === 0) {
      message.warning("Vui lòng cung cấp thông tin");
      setModalOpen(false);
      return;
    }
    setPending(true);
    const response = await dispatch(
      importQuantityProduct({ id: product_id, data: sizeChanges })
    );
    if (response.payload.status === 200) {
      message.success("Lưu thành công");
      if (openSale) {
        await dispatch(
          updateActiveProduct({
            id: product_id,
            data: { status: 1 },
          })
        );
      }
      await dispatch(getOneProductImport(product_id));
      setSizeChanges([]);
    } else {
      message.error("Lưu thất bại");
    }
    setPending(false);
    setModalOpen(false);
  };

  const onChangeCheckBox = (e) => {
    setOpenSale(e.target.checked);
  };

  return (
    <>
      <Modal
        title="Lưu thay đổi"
        style={{
          top: 20,
        }}
        open={modalOpen}
        onOk={() => handleSave()}
        onCancel={() => setModalOpen(false)}
      >
        <p className="py-2">Xác nhận lưu thông tin thay đổi</p>
        {status === 0 && (
          <div className="pt-2 border-t">
            <Checkbox onChange={onChangeCheckBox}>Mở bán sản phẩm</Checkbox>;
          </div>
        )}
      </Modal>
      <Modal
        title="Thêm size"
        open={modalNewSize}
        onOk={() => handleSaveNewSize()}
        onCancel={() => setModalNewSize(false)}
      >
        <div className="flex items-center justify-around py-4">
          <div className="flex flex-col items-center gap-2">
            <p>Màu: {newSizes?.color_name}</p>
            <img
              src={newSizes?.image}
              alt=""
              className="size-16 object-cover"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p>Tên size</p>
            <input
              type="text"
              name="size_name"
              className="size-16 text-center flex items-center justify-center bg-[#f4f5f6] rounded-md shadow-lg border border-blue-300"
              onChange={(e) => handleChangeNewSize(e)}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p>Số lượng</p>
            <input
              type="number"
              name="quantity"
              onChange={(e) => handleChangeNewSize(e)}
              className="size-16 text-center flex items-center justify-center bg-[#f4f5f6] rounded-md shadow-lg border border-blue-300"
            />
          </div>
        </div>
      </Modal>
      <div className="flex flex-col gap-2 bg-white rounded-lg shadow-md p-4">
        {options?.map((op) => (
          <div key={op.color_size_id} className="flex pb-10 border-b">
            <div className="pe-20">
              <div className="flex items-center justify-between">
                <p>Màu sắc: {op.color_name}</p>
                <Button danger>Thay ảnh</Button>
              </div>
              <Image
                src={op.image}
                width={300}
                alt=""
                className="mt-4 object-cover"
              />
            </div>
            <div className="flex-1 border-x text-sm text-nowrap text-center">
              <div className="flex justify-end items-center px-4 gap-5">
                <div className="w-16">Tồn kho</div>
                <div className="w-16">Điều chỉnh</div>
                <div className="w-16">Nhập thêm</div>
                <Button className="border-0 ">Huỷ size</Button>
              </div>
              {op.sizes?.map((s) => (
                <div
                  key={s.size_id}
                  className="flex items-center justify-between border-b py-2 px-4 cursor-pointer hover:bg-gray-100"
                >
                  <span>{s.size_name}</span>
                  <div className="flex items-center gap-5">
                    <input
                      type="number"
                      value={s.quantity}
                      className={`size-16 text-center flex items-center justify-center bg-[#f4f5f6] rounded-md shadow-lg border ${
                        s.quantity > 10 ? "border-blue-300" : "border-red-300"
                      } `}
                      readOnly
                    />
                    <input
                      type="number"
                      className="size-16 text-center flex items-center justify-center bg-[#f4f5f6] rounded-md shadow-lg border border-blue-300"
                      value={
                        sizeChanges.find((item) => item.size_id === s.size_id)
                          ?.quantity_change || ""
                      }
                      onChange={(e) =>
                        handleChange(
                          s.size_id,
                          "quantity_change",
                          +e.target.value
                        )
                      }
                    />
                    <input
                      type="number"
                      className="size-16 text-center flex items-center justify-center bg-[#f4f5f6] rounded-md shadow-lg border border-blue-300"
                      value={
                        sizeChanges.find((item) => item.size_id === s.size_id)
                          ?.insert_quantity || ""
                      }
                      onChange={(e) =>
                        handleChange(
                          s.size_id,
                          "insert_quantity",
                          +e.target.value || 0
                        )
                      }
                    />
                    <Button danger>Huỷ size</Button>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleSelectNewSize(op)}
                  className="size-14 ms-2 mt-2 text-center flex items-center justify-center bg-[#f4f5f6] rounded-md shadow-lg border border-blue-300"
                >
                  +
                </Button>
                <p>Thêm size</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Option;
