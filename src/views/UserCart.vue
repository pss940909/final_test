<template>
  <vue-loading :active="isLoading"></vue-loading>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-7">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" width="180">圖片</th>
              <th scope="col">產品名稱</th>
              <th scope="col">價格</th>
              <th scope="col" width="200"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in productList" :key="product.id">
              <th scope="row">
                <img
                  :src="product.imageUrl"
                  :alt="product.imageUrl"
                  class="img-fluid"
                />
              </th>
              <td>{{ product.title }}</td>
              <td>
                <small class="text-decoration-line-through">{{
                  $filters.currency(product.origin_price)
                }}</small>
                <p>{{ $filters.currency(product.price) }}</p>
              </td>
              <td class="vertical-middle">
                <div
                  class="btn-group btn-group-sm"
                  role="group"
                  aria-label="Basic outlined example"
                >
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="showDetails(product.id)"
                  >
                    更多
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    :disabled="status.loadingItem === product.id"
                  >
                    <div
                      class="spinner-border spinner-border-sm text-primary me-2"
                      role="status"
                      v-if="status.loadingItem === product.id"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <span @click="addCart(product.id)" class="mb-0"
                      >加入購物車</span
                    >
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-5">
        <table class="table table-sm table-hover" v-if="cartList.length">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">品名</th>
              <th scope="col">數量</th>
              <th scope="col">單價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cart in cartList" :key="cart.id" class="align-middle">
              <th scope="row">
                <button
                  class="btn btn-outline-danger"
                  @click="deleteCartItem(cart.id)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </th>
              <td>
                {{ cart.product.title }}
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <input
                    type="number"
                    class="form-control"
                    v-model.number="cart.qty"
                    min="1"
                    max="99"
                    @change="updateCart(cart)"
                    :disabled="this.status.loadingItem == cart.id"
                  />
                  <span class="input-group-text" id="basic-addon2">{{
                    cart.product.unit
                  }}</span>
                </div>
              </td>
              <td>{{ cart.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <th scope="row" class="text-center">總價</th>
            <td colspan="3" class="text-end">
              <small class="text-decoration-line-through">{{ total }}</small>
              <p class="fw-bold">{{ final_total }}</p>
            </td>
          </tfoot>
        </table>
        <div v-else>
          <i class="bi bi-basket3 me-2"></i>
          <span>購物車內無品項</span>
        </div>
      </div>
    </div>
    <vue-pagination
      :pages="pagination"
      @emitPages="getProducts"
    ></vue-pagination>
  </div>
</template>

<script>
import VuePagination from "../components/VuePagiantion.vue";
export default {
  components: {
    VuePagination,
  },
  data() {
    return {
      isLoading: false,
      productList: {},
      cartList: {},
      total: 0,
      fianl_total: 0,
      pagination: {},
      status: {
        loadingItem: "",
      },
    };
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products?page=${page}`;
      this.axios.get(url).then((res) => {
        console.log(res.data);
        if (res.data.success) {
          this.productList = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        }
      });
    },
    showDetails(id) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.axios.get(url).then((res) => {
        if (res.data.success) {
          this.$router.push(`/user/products/${id}`);
          this.isLoading = false;
        }
      });
    },
    addCart(productId) {
      this.status.loadingItem = productId;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const product = { product_id: productId, qty: 1 };
      this.axios.post(url, { data: product }).then((res) => {
        console.log(res.data);
        this.status.loadingItem = "";
        this.getCartList();
      });
    },
    getCartList() {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.axios.get(url).then((res) => {
        console.log(res.data);
        if (res.data.success) {
          this.cartList = res.data.data.carts;
          this.total = res.data.data.total;
          this.final_total = res.data.data.final_total;
          this.isLoading = false;
        }
      });
    },
    deleteCartItem(cartID) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${cartID}`;
      this.axios.delete(url).then((res) => {
        console.log(res);
        this.isLoading = false;
        this.getCartList();
      });
    },
    updateCart(cart) {
      this.status.loadingItem = cart.id;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${cart.id}`;
      const cartInfo = { product_id: cart.product_id, qty: cart.qty };
      this.axios.put(url, { data: cartInfo }).then((res) => {
        if (res.data.success) {
          console.log(res.data);
          this.status.loadingItem = "";
          this.getCartList();
        }
      });
    },
  },
  created() {
    this.getProducts();
    this.getCartList();
  },
};
</script>
