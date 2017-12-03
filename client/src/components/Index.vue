<template>
  <div>
  <p>Welcome to Meme dream, a photo site where users can add and tag memes</p>
  <form action="/upload">
      <router-link to="/upload" class="waves-effect waves-light btn-large">Upload</router-link>
        <router-link to="/login" class="waves-effect waves-light btn-large">Login</router-link>
          <router-link to="/register" class="waves-effect waves-light btn-large">Register</router-link>

  </form>
</div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
