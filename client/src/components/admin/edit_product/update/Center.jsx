import { Input } from "antd";
import React from "react";

const Center = () => {
  return (
    <>
      <div className="flex-1">
        <div className="border border-gray-200 p-4 rounded-[20px]">
          <h3 className="text-xl font-normal mb-8">Tổng quan</h3>
          <h5 className="text-base font-normal mb-2">Tên sản phẩm</h5>
          <Input
            placeholder="nhập tên sản phẩm"
            name="name"
            // value={formik.values.name}
            // onChange={formik.handleChange}
          />

          <h5 className="text-base font-normal mb-2 mt-5">
            Chi tiết sản phẩm sản phẩm
          </h5>
          {/* <Editor setDescription={setDescription} description={description} /> */}
        </div>
      </div>
    </>
  );
};

export default Center;
