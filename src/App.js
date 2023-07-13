import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/admin-login/LoginPage";
import AdminRegistrationPage from "./pages/admin-registration/AdminRegistrationPage";
import EmailVerification from "./pages/admin-registration/EmailVerification";
import Dashboard from "./pages/dashboard/Dashboard";
import { PrivateRouter } from "./components/private-router/PrivateRouter";
import Categories from "./pages/categories/Categories";
import PaymentMethods from "./pages/paymentMethods/PaymentMethods";
import AdminProfile from "./pages/admin-profile/AdminProfile";
import ResetPassword from "./pages/admin-login/ResetPassword";
import AdminUsers from "./pages/admin-users/AdminUsers";
import Order from "./pages/orders/Order";
import OrderDetails from "./pages/orders/OrderDetails";
import Reviews from "./pages/reviews/Reviews";
import Users from "./pages/users/Users";
import Item from "./pages/items/Item";
import NewItem from "./pages/items/NewItem";
import EditItem from "./pages/items/EditItem";
import Products from "./pages/products/Products";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* private routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRouter>
                <Dashboard />
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/categories"
            element={
              <PrivateRouter>
                <Categories />
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/products"
            element={
              <PrivateRouter>
                <Products />
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/items"
            element={
              <PrivateRouter>
                <Item />
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/items/new"
            element={
              <PrivateRouter>
                <NewItem />
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/items/edit/:_id"
            element={
              <PrivateRouter>
                <EditItem />
              </PrivateRouter>
            }
          ></Route>

          <Route
            path="/paymentmethods"
            element={
              <PrivateRouter>
                <PaymentMethods />
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/admin-profile"
            element={
              <PrivateRouter>
                <AdminProfile />
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <PrivateRouter>
                <AdminRegistrationPage />
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/orders"
            element={
              <PrivateRouter>
                <Order />
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/orders/:_id"
            element={
              <PrivateRouter>
                <OrderDetails />
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/reviews"
            element={
              <PrivateRouter>
                <Reviews />
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/users"
            element={
              <PrivateRouter>
                <Users />
              </PrivateRouter>
            }
          ></Route>
          <Route
            path="/admin-users"
            element={
              <PrivateRouter>
                <AdminUsers></AdminUsers>
              </PrivateRouter>
            }
          ></Route>
          {/* public routes */}
          <Route path="/" element={<LoginPage />}></Route>
          <Route
            path="/admin/verify-email"
            element={<EmailVerification />}
          ></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}
export default App;
