<template>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="login">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
            v-model="user.username"
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
            v-model="user.password"
          />
        </div>

        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            登入
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import swal from "sweetalert";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const url = process.env.VUE_APP_API + "/admin/signin";
      console.log(url);
      this.axios.post(url, this.user).then((res) => {
        // 登入成功
        if (res.data.success) {
          // 將token 以及 expired 存入cookie
          const { token, expired } = res.data;
          document.cookie = `loginToken=${token}; expires=${new Date(expired)}`;
          // 自動轉到後台產品頁
          this.$router.push("/dashboard/products");
          // 登入失敗
        } else {
          swal({
            title: "帳號密碼有誤",
            text: "請重新登入",
            icon: "warning",
            dangerMode: true,
          });
        }
      });
    },
    checkLogin() {
      const loginToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)loginToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      this.axios.defaults.headers.common["Authorization"] = loginToken;
    },
  },
  mounted() {
    const loginToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)loginToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    console.log(loginToken);
  },
};
</script>
