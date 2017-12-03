<template>
<div class="row">
  <h1> Login </h1>
    <div class="row">
      <div class="input-field col s12">
        <input id="Username" type="text" name="username" class="validate" v-model="username" required>
        <label for="Username">Username</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <input id="password" type="password" name="password" v-model="password" data-error="Check your password" class="validate" required>
        <label for="password">Password</label>
      </div>
    </div>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <button @click="login" class="btn waves-effect waves-light" type="submit" name="action">Submit
        <i class="material-icons right">send</i>
    </button>
</div>
</template>

<script>
import Auth from '@/services/Auth'
export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
   async login () {
     try {
       const login = await Auth.login({
        username: this.username,
        password: this.password
      })
      console.log(login)
      this.$store.dispatch('setUser', login.data.username)
     } catch (error) {
       this.error = error.response.data.error
     }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
