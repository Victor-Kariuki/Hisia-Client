<template>
  <nav class="navbar" role="navigation"
    aria-label="main navigation">
    <div class="navbar-brand">
      <router-link tag="a" class="navbar-item logo-font" to="/">
        Hisia
      </router-link>
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
        data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <template v-if="token == ''">
          <router-link tag="a" class="navbar-item" to="/about">
            About
          </router-link>
          <router-link tag="a" class="navbar-item" to="/contact">
            Contact
          </router-link>
        </template>
        <template v-else>
          <router-link tag="a" class="navbar-item" to="/profile">
            Profile
          </router-link>
          <router-link tag="a" class="navbar-item" to="/dashboard">
            Dashboard
          </router-link>
        </template>
      </div>
      <div class="navbar-end">
        <template v-if="token !== ''">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              {{ user.company_name }}
            </a>
            <div class="navbar-dropdown">
              <!-- <router-link tag="a" class="navbar-item" to="/profile">
                Profile
              </router-link> -->
              <hr class="navbar-divider">
              <a class="navbar-item" @click="logout">
                Logout
              </a>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="navbar-item">
            <div class="buttons">
              <b-button tag="router-link" to="/register" type="is-primary">
                Register
              </b-button>
              <b-button tag="router-link" to="/login" type="is-light">
                Login
              </b-button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',

  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    user() {
      return this.$store.getters.getUserDetails;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$toast.open({
            message: 'Successfully logged out',
            type: 'is-success',
            position: 'is-bottom',
          });
          this.$router.push('/login');
        })
        .catch(() => {
          this.$toast.open({
            message: 'Error logging out',
            type: 'is-danger',
            position: 'is-bottom',
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=Libre+Barcode+39+Text&display=swap');
  .logo-font {
    font-family: 'Libre Barcode 39 Text', cursive;
    font-size: 1.5em;
  }
</style>
