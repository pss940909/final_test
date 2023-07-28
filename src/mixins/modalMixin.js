import { Modal } from "bootstrap";

export default {
  methods: {
    showModal() {
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
