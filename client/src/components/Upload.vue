<template>
  <form class="form-horizontal" action="" method="post" enctype="multipart/form-data">
      <div class="form-group">
          <label for="inputEmail" class="control-label">Author: </label>
              <input type="text" name="author" class="form-control" id="inputEmail" placeholder="Author">
      </div>
      <div class="form-group">
          <label for="tags">Tags: </label>
          <input type="text" class="form-control" name="tags" value="" placeholder="Add some tags!">
      </div>
      <!-- possible dropzone js?  -->
      <div class="form-group">
          <label for="p">Upload: </label>
          <input class="form-control-file" type="file" name="pic" value="" id="p" required>
      </div>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <!-- <input type="submit" name="" value="Upload photo"> -->
      <button class="btn waves-effect waves-light" type="submit" name="action">Submit
          <i class="material-icons right">send</i>
      </button>
      <!-- name has to match multer name -->
  </form>

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
