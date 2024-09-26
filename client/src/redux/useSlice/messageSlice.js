import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUserChat,
  getMessageUserChat,
} from "../../services/message.service";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    data: [],
    dataEdit: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserChat.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getAllUserChat.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(getAllUserChat.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      })
      .addCase(getMessageUserChat.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(getMessageUserChat.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.dataEdit = action.payload;
      })
      .addCase(getMessageUserChat.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.error.message;
      });
  },
});

export default messageSlice.reducer;
