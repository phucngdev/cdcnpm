import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOneProductImport } from "../../services/product.service";
import Header from "../../components/admin/edit_product/import/Header";
import Option from "../../components/admin/edit_product/import/Option";

const ImportProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    await dispatch(getOneProductImport(id));
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const product = useSelector((state) => state.product.dataEdit);
  console.log(product);

  return (
    <>
      <Header
        product_name={product?.product_name}
        setModalOpen={setModalOpen}
      />
      <Option
        product_id={product?.product_id}
        status={product?.status}
        options={product?.options}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </>
  );
};

export default ImportProduct;
