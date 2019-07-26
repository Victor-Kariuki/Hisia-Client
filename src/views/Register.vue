<template>
  <div class="columns is-vcentered">
    <div class="column is-half">
      <figure class="image">
        <img src="../assets/images/authentication.svg" alt="">
      </figure>
    </div>
    <div class="column">
      <h1 class="title">Register</h1>
      <hr>
      <form @submit.prevent="validateBeforeSubmit">
        <b-field label="Company Name: " :type="{'is-danger': errors.has('company_name')}"
          :message="errors.first('company_name')">
          <b-input v-model="register.company_name" name="company_name" v-validate="'required'" />
        </b-field>
        <b-field label="Email: " :type="{'is-danger': errors.has('email')}"
          :message="errors.first('email')">
          <b-input v-model="register.email" name="email" v-validate="'required|email'" />
        </b-field>
        <b-field label="Password" :type="{'is-danger': errors.has('password')}"
          :message="errors.first('password')">
          <b-input type="password" v-model="register.password" name="password"
            v-validate="'required|min:8'" />
        </b-field>
        <b-field label="Confirm password" :type="{'is-danger': errors.has('confirm_password')}"
          :message="[{
            'The confirm password is required' : errors.firstByRule('confirm_password', 'required'),
            'The confirm password is not valid' : errors.firstByRule('confirm_password', 'is')
          }]">
          <b-input type="password" v-model="register.confirm_password" name="confirm_password"
            v-validate="{ required: true, is: password }" />
        </b-field>
        <button type="submit"
          :class="{'button':true, 'is-primary':true, 'is-loading': loading}">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',

  data() {
    return {
      register: {},
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
          this.$store.dispatch('Register', this.register)
            .then(() => {
              this.$toast.open({
                message: 'Successfully Registered',
                type: 'is-success',
                position: 'is-bottom',
              });
              this.register = {};
              this.$router.push('/login');
            })
            .catch(() => {
              this.$toast.open({
                message: 'Error registering. Please try again',
                type: 'is-danger',
                position: 'is-bottom',
              });
              this.register = {};
            });
          return;
        }
        this.$toast.open({
          message: 'Invalid form entires. Please check the field',
          type: 'is-danger',
          position: 'is-bottom',
        });
        this.register = {};
      });
    },
  },
};
</script>

<style>

</style>
