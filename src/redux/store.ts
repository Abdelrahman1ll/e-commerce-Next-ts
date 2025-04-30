import { configureStore } from "@reduxjs/toolkit";
import { ApiAuth } from "./Auth/ApiAuth";
import { ApiUser } from "./User/ApiUser";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ApiForgotPassword } from "./Auth/ApiForgotPassword";
import { ApiProducts } from "./Admin/ApiProduct";
import { ApiCategoryBrand } from "./Admin/ApiCategoryBrand";
import { ApiProductsGetAll } from "./Home/Product/ApiProducts";
import { ApiGetCart } from "./Cart/ApiGetCart";
import { ApiFilterbyNumberValue } from "./filter/ApiFilterbyNumberValue";
import { ApiAllProductInCategory } from "./Home/AllProductInCategory/ApiAllProductInCategory";
import { ApiMaintenance } from "./Orders/ApiMaintenance";
import { ApiOrders } from "./Orders/ApiMaintenance";
import { ApiCustomers } from "./CustomersWhoAreNotOnTheSite/ApiCustomers";
export const store = configureStore({
  reducer: {
    [ApiAuth.reducerPath]: ApiAuth.reducer,
    [ApiUser.reducerPath]: ApiUser.reducer, // أضف ApiUser هنا
    [ApiForgotPassword.reducerPath]: ApiForgotPassword.reducer,
    [ApiProducts.reducerPath]: ApiProducts.reducer,
    [ApiCategoryBrand.reducerPath]: ApiCategoryBrand.reducer,
    [ApiProductsGetAll.reducerPath]: ApiProductsGetAll.reducer,
    [ApiGetCart.reducerPath]: ApiGetCart.reducer,
    [ApiFilterbyNumberValue.reducerPath]: ApiFilterbyNumberValue.reducer,
    [ApiAllProductInCategory.reducerPath]: ApiAllProductInCategory.reducer,
    [ApiMaintenance.reducerPath]: ApiMaintenance.reducer,
    [ApiOrders.reducerPath]: ApiOrders.reducer,
    [ApiCustomers.reducerPath]: ApiCustomers.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ApiAuth.middleware,
      ApiUser.middleware,
      ApiForgotPassword.middleware,
      ApiProducts.middleware,
      ApiCategoryBrand.middleware,
      ApiProductsGetAll.middleware,
      ApiGetCart.middleware,
      ApiFilterbyNumberValue.middleware,
      ApiAllProductInCategory.middleware,
      ApiMaintenance.middleware,
      ApiOrders.middleware,
      ApiCustomers.middleware
    ), // أضف ميدلوير ApiUser
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
