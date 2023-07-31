<template>
  <vue-loading :active="isLoading"></vue-loading>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-7">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">圖片</th>
              <th scope="col">產品名稱</th>
              <th scope="col">價格</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-5"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  mounted() {},
};
</script>
