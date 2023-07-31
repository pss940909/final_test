import { Modal } from "bootstrap";

export default {
  methods: {
    showModal() {
      // 把input type=file的內容清空
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = "";
      }
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  // 要等modal完全載入才可以進行實體化
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
