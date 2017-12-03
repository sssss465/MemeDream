import Api from '@/services/Api'

export default {
  register (credentials) {
    Api().post('register', credentials)
  }
}
