<template>
  <div class="columns is-vcentered">
    <div class="column is-half">
      <figure class="image">
        <img src="../assets/images/contact.svg" alt="">
      </figure>
    </div>
    <div class="column is-half">
      <h1 class="title">Contact Us</h1>
      <hr>
      <form @submit.prevent="validateBeforeSubmit">
        <b-field label="Email: " :type="{'is-danger': errors.has('email')}"
          :message="errors.first('email')">
          <b-input v-model="contact.email" name="email" v-validate="'required|email'" />
        </b-field>
        <b-field label="Message" :type="{'is-danger': errors.has('message')}"
          :message="errors.first('message')">
          <b-input v-model="contact.message" name="message" maxlength="200" type="textarea"
            v-validate="'required|max:200'"></b-input>
        </b-field>
        <button type="submit"
          :class="{'button':true, 'is-primary':true, 'is-loading': loading}">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',

  data() {
    return {
      contact: {},
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
          this.$store.dispatch('createMessage', this.contact)
            .then(() => {
              this.$toast.open({
                message: 'Message successfully sent',
                type: 'is-success',
                position: 'is-bottom',
              });
              this.contact = {};
            })
            .catch(() => {
              this.$toast.open({
                message: 'Message not sent please try again',
                type: 'is-danger',
                position: 'is-bottom',
              });
              this.contact = {};
            });
          return;
        }
        this.$toast.open({
          message: 'Invalid form entires. Please check the field',
          type: 'is-danger',
          position: 'is-bottom',
        });
        this.contact = {};
      });
    },
  },
};
</script>

<style>

</style>
