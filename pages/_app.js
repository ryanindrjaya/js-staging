import React from "react";
import App from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import ThemeProvider from "../containers/ThemeProvider";
import "antd/dist/antd.css";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css";
import "../style/global.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import Middleware from "../components/Middleware";
import ErrorBoundary from "../components/ErrorBoundary";
import { PersistGate } from "redux-persist/integration/react";
import { Spin } from "antd";
import { storeSetting } from "../redux/store";

const { store, persistor } = storeSetting();

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Provider store={store}>
        <ThemeProvider>
          <Middleware>
            <ErrorBoundary>
              <PersistGate loading={<Spin />} persistor={persistor}>
                <Component {...pageProps} />
              </PersistGate>
            </ErrorBoundary>
          </Middleware>
          <ToastContainer toastStyle={{ backgroundColor: "black", color: "white" }} />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default CustomApp;
