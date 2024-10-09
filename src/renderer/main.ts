import { createApp } from "vue";

import App from "@/renderer/App.vue";
import router from "@/renderer/router";
import store from "@/renderer/store";
import "tailwindcss/tailwind.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

const app = createApp(App);
app.use(router).use(Antd).use(store).mount("#app");
app.config.globalProperties.$store = store;
