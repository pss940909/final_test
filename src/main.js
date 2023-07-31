import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 全域屬性 globalProperties
import { currency } from "@/methods/filters";

// Vue axios
import axios from "axios";
import VueAxios from "vue-axios";

// Import component
import Loading from "vue3-loading-overlay";
// Import stylesheet
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";
const app = createApp(App);

// 全域屬性
app.config.globalProperties.$filters = {
  currency,
  //   date
};
app.use(VueAxios, axios);
app.use(router);
// 全域註冊lodaing元件
app.component("VueLoading", Loading);
app.mount("#app");
