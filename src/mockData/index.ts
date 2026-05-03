import { productsMock } from "./productsMock";
import { cartMock } from "./cartMock";
import { adminMock } from "./userMock";
import { ordersMock } from "./ordersMock";
import { maintenanceMock } from "./maintenanceMock";
import { customersMock } from "./customersMock";

import { userListMock } from "./userListMock";

import { brandMock, categoryMock } from "./brandCategoryMock";
import { reviewsMock, reviewsProduct1, reviewsProduct2, reviewsProduct3, reviewsProduct4 } from "./reviewsMock";
import { deliveryMock } from "./deliveryMock";

export const getMockData = (url: string) => {
  if (url.match(/\/api\/Product\/[a-zA-Z0-9]+/)) {
    return { data: productsMock.data.products[0] };
  }
  if (url.includes("/api/Product")) {
    return productsMock;
  }
  if (url.includes("/api/deliveryAndtax")) {
    return deliveryMock;
  }
  if (url.includes("/api/brand")) {
    return brandMock;
  }
  if (url.includes("/api/category")) {
    return categoryMock;
  }
  if (url.includes("/api/cart")) {
    return cartMock;
  }
  if (url.includes("/api/user") && !url.includes("auth")) {
    return userListMock;
  }
  if (url.includes("/api/order")) {
    return ordersMock;
  }
  if (url.includes("/api/maintenance")) {
    return maintenanceMock;
  }
  if (url.includes("/api/customers")) {
    return customersMock;
  }
  if (url.includes("/api/auth/login")) {
    return adminMock;
  }
  if (url.includes("/api/Review/product/")) {
    let productId = url.split("/").pop() || "";
    if (productId.includes("?")) {
      productId = productId.split("?")[0];
    }
    console.log(`[Mock System] Fetching reviews for product: ${productId}`);
    
    if (productId === "641351649") return reviewsProduct1;
    if (productId === "641351650") return reviewsProduct2;
    if (productId === "641351651") return reviewsProduct3;
    if (productId === "641351652") return reviewsProduct4;
    
    return reviewsMock;
  }
  return { data: [] };
};
