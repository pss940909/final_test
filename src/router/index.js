import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/DashBoard.vue"),
    children: [
      {
        path: "products",
        component: () => import("../views/ProductList.vue"),
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/UserBoard.vue"),
    children: [
      // 產品列表 & 購物車
      {
        path: "cart",
        component: () => import("../views/UserCart.vue"),
      },
      // 單一產品頁面
      {
        path: "product/:productId",
        component: () => import("../views/UserProduct.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
