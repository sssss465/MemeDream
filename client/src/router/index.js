import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Index from '@/components/Index'
import Upload from '@/components/Upload'
import Picture from '@/components/Picture'
import User from '@/components/User'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/img/:filename',
    name: 'Picture',
    component: Picture
  },
  {
    path: '/users/:username',
    name: 'User',
    component: User
  }
  ]
})
