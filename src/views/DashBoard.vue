<template>
  <h2>Dashboard</h2>
  <nav-bar></nav-bar>
  <div class="container-fluid">
    <router-view />
  </div>
</template>

<script>
import swal from "sweetalert";
import NavBar from "../components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  created() {
    // 從cookie中取出登入時存入的token
    const loginToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)loginToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // 將token放到headers裡 (global)
    this.axios.defaults.headers.common["Authorization"] = loginToken;
    const url = process.env.VUE_APP_API + "/api/user/check";
    // 確認是否維持登入狀態
    this.axios.post(url).then((res) => {
      if (!res.data.success) {
        swal({
          title: "請重新登入",
          text: "登入效期已過",
          icon: "warning",
          dangerMode: true,
          timer: 2000,
        });
        this.$router.push("/login");
      }
    });
  },
};
</script>
