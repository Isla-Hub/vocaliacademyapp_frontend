import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import { createLogger } from "redux-logger";

const logger = createLogger();

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
