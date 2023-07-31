<template>
  <vue-loading :active="isLoading"></vue-loading>
  <div class="text-end mt-3">
    <button class="btn btn-primary" @click="openModal(true)" type="button">
      建立新產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td class="text-right">
          {{ $filters.currency(product.origin_price) }}
        </td>
        <td class="text-right">{{ $filters.currency(product.price) }}</td>
        <td>
          <span class="text-success" v-if="product.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal(false, product)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openDeleteModal(product)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <vue-pagination :pages="pagination" @emitPages="getProducts"></vue-pagination>
  <product-modal
    ref="productModal"
    :product="tempProduct"
    @editProduct="editProduct"
  ></product-modal>
  <delete-modal
    ref="deleteModal"
    :product="tempProduct"
    @deleteProduct="deleteProduct"
  ></delete-modal>
</template>

<script>
import DeleteModal from "../components/DeleteModal.vue";
import ProductModal from "../components/ProductModal.vue";
import VuePagination from "../components/VuePagiantion.vue";

export default {
  components: {
    ProductModal,
    DeleteModal,
    VuePagination,
  },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
    };
  },
  methods: {
    getProducts(page = 1) {
      // 加入loading效果
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.axios.get(url).then((res) => {
        if (res.data.success) {
          console.log(res.data);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        }
      });
    },
    openModal(isNew, product) {
      // 編輯產品 => 傳遞產品資訊
      if (isNew) {
        this.tempProduct = {};
      } // 新增產品
      else {
        this.tempProduct = { ...product };
      }
      this.isNew = isNew;
      this.$refs.productModal.showModal();
    },
    openDeleteModal(product) {
      this.tempProduct = product;
      this.$refs.deleteModal.showModal();
    },
    editProduct(product) {
      this.tempProduct = product;
      this.isLoading = true;
      // 新增產品
      if (this.isNew) {
        const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
        this.axios.post(url, { data: this.tempProduct }).then((res) => {
          if (res.data.success) {
            this.$refs.productModal.hideModal();
            this.isLoading = false;
            this.getProducts();
          }
        });
      } // 修改產品
      else {
        const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
        this.axios.put(url, { data: this.tempProduct }).then((res) => {
          if (res.data.success) {
            this.$refs.productModal.hideModal();
            this.isLoading = false;
            this.getProducts();
          }
        });
      }
    },
    deleteProduct(product) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${product.id}`;
      this.axios.delete(url).then((res) => {
        console.log(res.data);
        if (res.data.success) {
          this.isLoading = false;
          this.$refs.deleteModal.hideModal();
          this.getProducts();
        }
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
