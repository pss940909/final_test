<template>
  <h2>產品細節</h2>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/user/cart">產品列表</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ product.title }}
        </li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-md-8">
        <div class="div">
          <h2>{{ product.title }}</h2>
          <small class="fw-bold">{{ product.content }}</small>
          <p>{{ product.description }}</p>
          <img
            :src="product.imageUrl"
            :alt="product.title"
            class="img-fluid d-block"
            width="200"
          />
        </div>
      </div>
      <div class="col-md-4">
        <small class="text-decoration-line-through">{{
          product.origin_price
        }}</small>
        <p class="text-bold">{{ product.price }}</p>
        <hr />
        <button class="btn btn-outline-primary" @click="addCart">
          加入購物車
        </button>
      </div>
    </div>
  </div>
  <vue-loading :active="isLoading"></vue-loading>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      isLoading: false,
    };
  },
  computed: {
    productId() {
      return this.$route.params.productId;
    },
  },
  created() {
    this.isLoading = true;
    const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.productId}`;
    this.axios.get(url).then((res) => {
      console.log(res.data);
      this.product = res.data.product;
      console.log(this.product);
      this.isLoading = false;
    });
  },
};
</script>
