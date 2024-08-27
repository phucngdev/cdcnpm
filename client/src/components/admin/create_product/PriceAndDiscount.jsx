import { Input } from "antd";
import React from "react";

const PriceAndDiscount = ({ formik }) => {
  return (
    <>
      <div className="border border-gray-200 p-4 rounded-[20px] mt-4">
        <h3 className="text-xl font-normal mb-8">Giá và giảm giá</h3>
        <div className="flex items-start justify-between gap-10">
          <div className="flex-1">
            <h5 className="text-base font-normal mb-2">Giá sản phẩm</h5>
            <Input
              placeholder="nhập giá sản phẩm"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.price}
              </div>
            ) : null}
          </div>
          <div className="flex-1">
            <h5 className="text-base font-normal mb-2">Giảm giá (%)</h5>
            <Input
              placeholder="nhập % giảm giá sản phẩm"
              name="discount"
              value={formik.values.discount}
              onChange={formik.handleChange}
            />
            {formik.touched.discount && formik.errors.discount ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.discount}
              </div>
            ) : null}
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-10">
          <div className="flex-1">
            <h5 className="text-base font-normal mb-2">Giá bán thực tế</h5>
            <Input
              placeholder="Giá bán ra"
              value={formik.values.price * (1 - formik.values.discount / 100)}
            />
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </>
  );
};

export default PriceAndDiscount;
