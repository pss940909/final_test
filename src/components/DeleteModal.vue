<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title text-white" id="exampleModalLabel">
            刪除{{ tempProduct.title }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          確定要刪除
          <strong class="text-danger">{{ tempProduct.title }}</strong>
          嗎? (刪除後無法恢復)
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="hideModal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="confirmDelete">
            確定刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from "@/mixins/modalMixin";
export default {
  data() {
    return {
      tempProduct: {},
    };
  },
  props: ["product"],
  watch: {
    product() {
      this.tempProduct = this.product;
    },
  },
  methods: {
    confirmDelete() {
      this.$emit("deleteProduct", this.tempProduct);
    },
  },
  mixins: [modalMixin],
};
</script>
