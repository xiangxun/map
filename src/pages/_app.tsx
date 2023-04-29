import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/redux/store";
// import { store } from "@/redux/store";
import React from "react";
import axios from "axios";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "@/styles/nprogress.css";

axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.headers.common["Content-Type"] = "application/json";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
  console.log("routeChangeStart");
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
