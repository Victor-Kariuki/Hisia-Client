<template>
  <div class="columns is-vcentered">
    <div class="column is-half">
      <h1 class="title logo-font">Hisia feedback monitoring system</h1>
      <h3 class="subtitle tagline-font">revolutionizing data analysis</h3>
      <div class="buttons">
        <b-button tag="router-link" to="/register" type="is-primary">
          Register
        </b-button>
        <b-button tag="router-link" to="/login" type="is-light">
          Login
        </b-button>
      </div>
    </div>
    <div class="column">
      <figure class="image">
        <img src="../assets/images/dashboard.svg" alt="">
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=Libre+Barcode+39+Text&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Pacifico&display=swap');
  .logo-font {
    font-family: 'Libre Barcode 39 Text', cursive;
  }
  .tagline-font {
    font-family: 'Pacifico', cursive;
  }
</style>
