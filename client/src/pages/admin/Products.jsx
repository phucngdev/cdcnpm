import React, { useEffect } from "react";
import ListProduct from "../../components/admin/products/list/ListProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../services/category.service";
import { getAllProduct } from "../../services/product.service";
import Overview from "../../components/admin/products/Overview";

const Products = () => {
  const dispatch = useDispatch();
  const fetchData = async () => {
    const promises = [
      dispatch(getAllProduct({ page: 0, limit: 0 })),
      dispatch(getAllCategory()),
    ];
    await Promise.allSettled(promises);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const products = useSelector((state) => state.product.data);

  return (
    <>
      <Overview
        totalProduct={products.products?.length}
        totalActive={products.products?.filter((p) => p.status === 1).length}
      />
      <ListProduct />
    </>
  );
};

export default Products;
