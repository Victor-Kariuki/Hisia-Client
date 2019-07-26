<template>
  <section id="app" class="hero is-fullheight">
    <div class="hero-head">
      <Navbar />
    </div>
    <div class="hero-body">
      <div class="container">
        <transition data-aos="fade-up" data-aos-easing="ease-in-out" data-aos-duration="1000">
          <router-view />
        </transition>
      </div>
    </div>
    <div class="hero-foot">
      <Footer />
    </div>
  </section>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',

  components: {
    Navbar,
    Footer,
  },
};
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');
#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
