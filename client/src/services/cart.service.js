import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import BaseUrl from "../apis/axios";

export const addToCart = createAsyncThunk("addToCart", async (product) => {
  try {
    const response = await BaseUrl.post(`/cart/add`, product);
    return response.data;
  } catch (error) {
    message.error("Lỗi khi xử lý! thử lại");
  }
});

export const getCart = createAsyncThunk("getCart", async () => {
  try {
    const response = await BaseUrl.get(`/cart`);
    return response.data;
  } catch (error) {
    message.error("Lỗi khi xử lý! thử lại");
  }
});

export const handleChangeQuantity = createAsyncThunk(
  "handleChangeQuantity",
  async (data, cart_id, cart_item_id) => {
    try {
      const response = await BaseUrl.patch(
        `/cart/${cart_id}/${cart_item_id}`,
        data
      );
      return response.data;
    } catch (error) {
      message.error("Lỗi khi xử lý! thử lại");
    }
  }
);

export const plusCount = createAsyncThunk("plusCount", (product) => {
  try {
    return product;
  } catch (error) {
    message.error("Lỗi khi xử lý! thử lại");
  }
});

export const minusCount = createAsyncThunk("minusCount", (product) => {
  try {
    return product;
  } catch (error) {
    message.error("Lỗi khi xử lý! thử lại");
  }
});

export const deleteFromCart = createAsyncThunk("deleteFromCart", (product) => {
  try {
    return product;
  } catch (error) {
    message.error("Lỗi khi xử lý! thử lại");
  }
});
