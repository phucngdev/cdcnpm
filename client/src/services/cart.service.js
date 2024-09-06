import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import BaseUrl from "../apis/axios";
import Cookies from "js-cookie";

export const addToCart = createAsyncThunk("add/cart", async ({ id, data }) => {
  try {
    console.log(id, data);

    const response = await BaseUrl.post(`/cart/add/${id}`, data);
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
});

export const getCart = createAsyncThunk("get/cart", async (id) => {
  try {
    const response = await BaseUrl.get(`/cart/${id}`);
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
});

export const updateCart = createAsyncThunk("update/cart", async (data) => {
  try {
    const response = await BaseUrl.put(`/cart/update`, data);
    return response.data;
  } catch (error) {
    message.error(error.message);
  }
});

export const deleteCartItem = createAsyncThunk(
  "delete/cart/item",
  async (id) => {
    try {
      const response = await BaseUrl.delete(`/cart/${id}`);
      return response.data;
    } catch (error) {
      message.error(error.message);
    }
  }
);
