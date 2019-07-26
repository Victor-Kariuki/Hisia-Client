<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        &copy; {{ date }} | All Rights Reserved
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',

  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
};
</script>

<style>

</style>
