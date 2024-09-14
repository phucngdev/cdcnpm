import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import _debounce from "lodash/debounce";
import { searchProduct } from "../../../services/product.service";
import AuthButtons from "./AuthButtons";
import SearchList from "./SearchList";
import CartAndUserMenu from "./CartAndUserMenu";
import { useDebounce } from "../../../hooks/useDebounce";

const TopHeader = ({ user, setUser }) => {
  const dispatch = useDispatch();
  const searchProducts = useSelector((state) => state.product.dataSearch);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (search !== "") {
      dispatch(searchProduct(debouncedSearch));
    }
  }, [debouncedSearch]);

  return (
    <>
      <div className="hidden md:block py-[5px] bg-[#f5f5f5]">
        <div className="container mx-auto flex gap-2 justify-end items-center">
          <form className="relative h-10 flex items-center">
            <Input
              placeholder="Tìm kiếm sản phẩm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {searchProducts && search && (
              <SearchList searchProducts={searchProducts} />
            )}
          </form>
          {user ? (
            <CartAndUserMenu user={user} setUser={setUser} />
          ) : (
            <AuthButtons />
          )}
        </div>
      </div>
    </>
  );
};

export default TopHeader;
