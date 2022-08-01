import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/index";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
