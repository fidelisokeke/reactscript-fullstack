// import React from 'react'
import HomePage from "./pages/home";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password/page";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Transactions from "./pages/transactions";
import AddTransaction from "./pages/add-transaction";
import EditTransaction from "./pages/edit-transaction";
import ThemeProvider from "./theme";
import PublicLayout from "./layout/public-layout";
import ProfilePage from "./pages/profile";
import PrivateLayout from "./layout/private-layout";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateLayout>
                <HomePage />
              </PrivateLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateLayout>
                <ProfilePage />
              </PrivateLayout>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateLayout>
                <Transactions />
              </PrivateLayout>
            }
          />
          <Route
            path="/transactions/add"
            element={
              <PrivateLayout>
                <AddTransaction />
              </PrivateLayout>
            }
          />
          <Route
            path="/transactions/edit/:Id"
            element={
              <PrivateLayout>
                <EditTransaction />
              </PrivateLayout>
            }
          />
          <Route
            path="/login"
            element={
              <PublicLayout>
                <LoginPage />
              </PublicLayout>
            }
          />
          <Route
            path="/register"
            element={
              <PublicLayout>
                {" "}
                <RegisterPage />{" "}
              </PublicLayout>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicLayout>
                {" "}
                <ForgotPassword />{" "}
              </PublicLayout>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicLayout>
                {" "}
                <ResetPassword />{" "}
              </PublicLayout>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <div  className="p-5  font-bold flex flex-col gap-5 w-max">
     <h1> app component in home page</h1>
    </div> */}
    </ThemeProvider>
  );
}

export default App;
