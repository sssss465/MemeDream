<template>
<div class="row">
  <h1> Login </h1>
  <form class="col s12" method="POST" action="{act}">
    <div class="row">
      <div class="input-field col s12">
        <input id="Username" type="text" name="username" class="validate" required>
        <label for="Username">Username</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <input id="password" type="password" name="password" data-error="Check your password" class="validate">
        <label for="password">Password</label>
      </div>
    </div>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <button class="btn waves-effect waves-light" type="submit" name="action">Submit
        <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
