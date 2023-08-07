<template>
  <div class="toast-container position-absolute pe-3 top-0 end-0">
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg" />
  </div>
</template>

<script>
import Toast from "@/components/ToastMessage.vue";

export default {
  components: { Toast },
  data() {
    return {
      messages: [],
    };
  },
  inject: ["emitter"],
  mounted() {
    this.emitter.on("push-msg", (message) => {
      const { style = "success", title, content } = message;
      this.message.push({ style, title, content });
    });
  },
};
</script>
