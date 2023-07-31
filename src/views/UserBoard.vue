<template>
  <h2>UserBoard</h2>
  <user-nav></user-nav>
  <div class="container-fluid">
    <router-view />
  </div>
</template>

<script>
import UserNav from "../components/UserNav.vue";
export default {
  components: {
    UserNav,
  },
};
</script>
