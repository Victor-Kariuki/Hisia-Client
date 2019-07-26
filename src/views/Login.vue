<template>
  <div class="columns is-vcentered">
    <div class="column is-half">
      <figure class="image">
        <img src="../assets/images/authentication.svg" alt="">
      </figure>
    </div>
    <div class="column">
      <h1 class="title">Login</h1>
      <hr>
      <form @submit.prevent="validateBeforeSubmit">
        <b-field label="Email: " :type="{'is-danger': errors.has('email')}"
          :message="errors.first('email')">
          <b-input v-model="login.email" name="email" v-validate="'required|email'" />
        </b-field>
        <b-field label="Password" :type="{'is-danger': errors.has('password')}"
          :message="errors.first('password')">
          <b-input type="password" v-model="login.password" name="password"
            v-validate="'required|min:8'" />
        </b-field>
        <button type="submit"
          :class="{'button':true, 'is-primary':true, 'is-loading': loading}">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      login: {},
    };
  },

  computed: {
    loading() {
      return this.$store.getters.getStatus;
    },
  },

  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch('login', this.login)
            .then(() => {
              this.$toast.open({
                message: 'Successfully Login',
                type: 'is-success',
                position: 'is-bottom',
              });
              this.login = {};
              this.$router.push('/dashboard');
            })
            .catch(() => {
              this.$toast.open({
                message: 'Wrong email or password. Please try again',
                type: 'is-danger',
                position: 'is-bottom',
              });
              this.login = {};
            });
          return;
        }
        this.$toast.open({
          message: 'Invalid form entires. Please check the field',
          type: 'is-danger',
          position: 'is-bottom',
        });
        this.login = {};
      });
    },
  },
};
</script>

<style>

</style>
