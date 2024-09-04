import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import BaseUrl from "../apis/axios";

export const addToCart = createAsyncThunk("add/cart", async (data) => {
  try {
    const response = await BaseUrl.post(`/cart/add`, data);
    return response.data;
  } catch (error) {
    message.error("Lỗi khi xử lý! thử lại");
  }
});

export const getCart = createAsyncThunk("get/cart", async () => {
  try {
    const response = await BaseUrl.get(`/cart`);
    console.log(response);

    return response.data;
  } catch (error) {
    message.error("Lỗi khi xử lý! thử lại");
    console.log(error.message);
  }
});

export const handleChangeQuantity = createAsyncThunk(
  "update/cart",
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

export const deleteCartItem = createAsyncThunk(
  "delete/cart/item",
  async (id) => {
    try {
      console.log(id);

      const response = await BaseUrl.delete(`/cart/${id}`);
      return response.data;
    } catch (error) {
      message.error("Lỗi khi xử lý! thử lại");
    }
  }
);
