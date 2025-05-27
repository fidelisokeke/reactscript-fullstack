import React from "react";
import { ConfigProvider } from "antd";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const primaryColorCode = "#000000";
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColorCode,
          controlOutline: "none",
        }, //used to override any property in global level
        components: {
          Button: {
            controlHeight: 45,
          },
          Input: {
            controlHeight: 45,
            colorBorder: "gray",
          },
          Select: {
            controlHeight: 45,
            colorBorder: "gray",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default ThemeProvider;
