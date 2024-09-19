import React, { useEffect, useMemo, useState } from "react";
import Editor from "../../components/admin/create_product/editor/Editor";
import { ShopOutlined } from "@ant-design/icons";
import { message, Button, Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../services/category.service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase/firebase.config";
import {
  getOneProduct,
  getOneProductForUpdate,
  updateProduct,
} from "../../services/product.service";
import { useParams } from "react-router-dom";
import ListImage from "../../components/admin/create_product/ListImage";
import DescriptionImage from "../../components/admin/create_product/DescriptionImage";
import ThumbnailHover from "../../components/admin/create_product/ThumbnailHover";
import Thumbnail from "../../components/admin/create_product/Thumbnail";
import Category from "../../components/admin/create_product/Category";
import PriceAndDiscount from "../../components/admin/create_product/PriceAndDiscount";
import NewCategory from "../../components/admin/create_product/NewCategory";
import SelectColor from "../../components/admin/create_product/SelectColor";
import NewColor from "../../components/admin/create_product/NewColor";
import Pending from "../../components/user/animation/Pending";
import ColorSelected from "../../components/admin/create_product/ColorSelected";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.allSettled([
        dispatch(getAllCategory()),
        dispatch(getOneProductForUpdate(id)),
      ]);
    } catch (error) {
      message.error("Error loading data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  const listImageRef = ref(storage, "products/");
  const categorys = useSelector((state) => state.category.data);
  const product = useSelector((state) => state.product.dataEdit);
  const [colors, setColors] = useState([
    // color fix sẵn
    { color_name: "Đỏ", sizes: [], image: "" },
    { color_name: "Xám", sizes: [], image: "" },
    { color_name: "Vàng", sizes: [], image: "" },
    { color_name: "Cam", sizes: [], image: "" },
    { color_name: "Nâu", sizes: [], image: "" },
    { color_name: "Trắng", sizes: [], image: "" },
    { color_name: "Đen", sizes: [], image: "" },
    { color_name: "Kem", sizes: [], image: "" },
    { color_name: "Hồng", sizes: [], image: "" },
    { color_name: "Xanh", sizes: [], image: "" },
  ]);
  const [isModalOpenNewCategory, setIsModalOpenNewCategory] = useState(false);
  const [showInput, setShowInput] = useState(false); // show input thêm mới màu
  const [imageUrls, setImageUrls] = useState([]); // mảng link ảnh images
  const [description, setDescription] = useState(""); // description
  const [colorSize, setColorSize] = useState([]); // màu và size của màu đã chọn

  const options = useMemo(() => {
    return categorys.map((c) => ({
      value: c.category_id,
      label: c.category_name,
    }));
  }, [categorys]);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: null,
      discount: null,
      thumbnail: "",
      thumbnail_hover: "",
      images: [],
      description_image: "",
      category: "",
      status: false,
      option: [],
      author: "",
    },
    validationSchema: Yup.object({
      product_name: Yup.string().required("Tên sản phẩm không được để trống"),
      category: Yup.string().required("Danh mục sản phẩm không được để trống"),
      price: Yup.number().required("Giá sản phẩm không được để trống"),
      discount: Yup.number().required("Giảm giá sản phẩm không được để trống"),
      thumbnail_hover: Yup.string().required(
        "Ảnh thumbnail hover sản phẩm không được để trống"
      ),
      thumbnail: Yup.string().required(
        "Ảnh thumbnail sản phẩm không được để trống"
      ),
      description_image: Yup.string().required(
        "Ảnh mô tả sản phẩm không được để trống"
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const editProduct = {
          product_name: values.product_name,
          thumbnail: values.thumbnail,
          thumbnail_hover: values.thumbnail_hover,
          discount: +values.discount,
          images: imageUrls,
          description: description,
          description_image: values.description_image,
          price: +values.price,
          status: 1,
          category: values.category,
          option: colorSize,
        };
        const response = await dispatch(
          updateProduct({ id: id, data: editProduct })
        );
        if (response.payload.status === 200) {
          message.success("Lưu sản phẩm thành công");
        }
        resetForm();
        setDescription("");
        setImageUrls([]);
      } catch (error) {
        message.error("Lỗi");
      }
    },
  });

  useEffect(() => {
    if (product) {
      // setColors(product.option);
      setImageUrls(product.images);
      setDescription(product.description);
      formik.setValues({
        product_name: product.product_name,
        price: product.price_max,
        discount: product.discount,
        thumbnail: product.thumbnail,
        thumbnail_hover: product.thumbnail_hover,
        description_image: product.description_image,
        category: product.category.category_name,
        status: product.status,
      });
      // setColorSize(product.option);
    }
  }, [product]);

  const handleCustomRequest = async ({
    file,
    onSuccess,
    onError,
    fieldName,
    colorLabel,
  }) => {
    try {
      setLoading(true);
      const imageRef = ref(listImageRef, file.name);
      await uploadBytes(imageRef, file);
      const downloadUrl = await getDownloadURL(imageRef);
      onSuccess({ url: downloadUrl });

      if (colorLabel) {
        setProductVariants((prevVariants) =>
          prevVariants.map((variant) =>
            variant.color_name === colorLabel
              ? { ...variant, image: downloadUrl }
              : variant
          )
        );
      } else {
        formik.setFieldValue(fieldName, downloadUrl);
      }
      setLoading(false);
    } catch (error) {
      onError(error);
      setLoading(false);
    }
  };

  const getUploadProps = (fieldName, colorLabel) => ({
    name: fieldName,
    onChange: (info) => {
      if (info.file.status === "done") {
        const downloadUrl = info.file.response.url;
        if (colorLabel) {
          setProductVariants((prevVariants) =>
            prevVariants.map((variant) =>
              variant.color === colorLabel
                ? { ...variant, image: downloadUrl }
                : variant
            )
          );
        } else {
          info.fileList.length === 1
            ? formik.setFieldValue(fieldName, downloadUrl)
            : setImageUrls((prevImageUrls) => [...prevImageUrls, downloadUrl]);
        }
        message.success("Tải ảnh thành công.");
      } else if (info.file.status === "error") {
        message.error("Tải ảnh thất bại");
      }
    },
    customRequest: (options) =>
      handleCustomRequest({ ...options, fieldName, colorLabel }),
  });

  const showModal = () => {
    setIsModalOpenNewCategory(true);
  };

  // chọn color cho sp
  const handleSelectColor = (color) => {
    const check = colorSize.find((c) => c.color_name === color.color_name);
    if (check) {
      message.warning("Màu đã chọn");
      return;
    }
    setColorSize([...colorSize, color]);
  };

  // xoá color đã chọn
  const handleRemoveColor = (color) => {
    setColorSize(colorSize.filter((c) => c !== color));
  };

  // click chọn size
  const handleSizeClick = (index, size) => {
    setColorSize((prevSelectedSizes) => {
      // Lấy danh sách kích thước hiện tại của màu đang chọn
      const currentSizes = prevSelectedSizes[index].sizes || [];

      // Kiểm tra xem kích thước đã có trong danh sách hay chưa
      const sizeExists = currentSizes.some((item) => item.size === size);

      // Tạo bản sao của mảng prevSelectedSizes để tránh thay đổi trực tiếp state cũ
      const updatedSelectedSizes = [...prevSelectedSizes];

      if (sizeExists) {
        // Nếu kích thước đã có trong danh sách, thì xoá nó
        updatedSelectedSizes[index] = {
          ...updatedSelectedSizes[index],
          sizes: currentSizes.filter((s) => s.size !== size),
        };
      } else {
        // Nếu kích thước chưa có trong danh sách, thì thêm vào
        updatedSelectedSizes[index] = {
          ...updatedSelectedSizes[index],
          sizes: [
            ...currentSizes,
            {
              size,
              quantity: 0,
            },
          ],
        };
      }

      return updatedSelectedSizes;
    });
  };

  // nhập số lượng của size
  const handleQuantityChange = (index, size, quantity) => {
    setColorSize((prevSelectedSizes) => {
      const updatedSelectedSizes = [...prevSelectedSizes];
      updatedSelectedSizes[index] = {
        ...updatedSelectedSizes[index],
        sizes: updatedSelectedSizes[index].sizes.map((s) =>
          s.size === size ? { ...s, quantity } : s
        ),
      };
      return updatedSelectedSizes;
    });
  };

  const handleAddColor = () => {
    setShowInput(true);
  };

  // thêm màu mới
  const handleSaveColor = () => {};

  // huỷ thêm màu
  const handleCancel = () => {
    setShowInput(false);
  };
  console.log(product);
  console.log(colorSize);

  if (loading || !formik.values) return <Pending />;

  return (
    <>
      <NewCategory
        isModalOpenNewCategory={isModalOpenNewCategory}
        setIsModalOpenNewCategory={setIsModalOpenNewCategory}
      />
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-2xl font-bold">
            <ShopOutlined /> Chỉnh sửa sản phẩm
          </h3>
          <Button type="primary" htmlType="submit">
            Lưu sản phẩm
          </Button>
        </div>
        <div className="flex gap-6">
          <div className="rounded-[20px] w-1/3">
            <Thumbnail
              formik={formik}
              getUploadProps={getUploadProps}
              loading={loading}
            />
            <ThumbnailHover
              formik={formik}
              getUploadProps={getUploadProps}
              loading={loading}
            />
            <DescriptionImage
              formik={formik}
              getUploadProps={getUploadProps}
              loading={loading}
            />
            <ListImage
              formik={formik}
              getUploadProps={getUploadProps}
              loading={loading}
              imageUrls={imageUrls}
            />
          </div>
          <div className="rounded-[20px] flex-1">
            <div className="border border-gray-200 p-4 rounded-[20px]">
              <h3 className="text-xl font-normal mb-8">Tổng quan</h3>
              <h5 className="text-base font-normal mb-2">Tên sản phẩm</h5>
              <Input
                placeholder="nhập tên sản phẩm"
                name="product_name"
                value={formik.values?.product_name}
                onChange={formik.handleChange}
              />
              {formik.touched.product_name && formik.errors.product_name ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.product_name}
                </div>
              ) : null}
              <h5 className="text-base font-normal mb-2 mt-5">
                Chi tiết sản phẩm sản phẩm
              </h5>
              <Editor
                setDescription={setDescription}
                description={description}
              />
              <SelectColor
                colors={colors}
                handleSelectColor={handleSelectColor}
                handleAddColor={handleAddColor}
              />
              <NewColor
                showInput={showInput}
                handleSaveColor={handleSaveColor}
                handleCancel={handleCancel}
              />
              <ColorSelected
                colorSize={colorSize}
                handleRemoveColor={handleRemoveColor}
                getUploadProps={getUploadProps}
                handleSizeClick={handleSizeClick}
                handleQuantityChange={handleQuantityChange}
                loading={loading}
              />
            </div>
            <PriceAndDiscount formik={formik} />
            <Category formik={formik} showModal={showModal} />
          </div>
        </div>
      </form>
    </>
  );
};

export default EditProduct;
