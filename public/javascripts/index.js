import 'materialize-css/dist/js/materialize.min.js';
import '../stylesheets/style.css';
import 'materialize-css/dist/css/materialize.min.css';
import axios from 'axios';
// import './styletest.css';
console.log('hello from webpack');

$(document).ready(function(){
     $('.carousel').carousel();
});
/////////////////// ajax for uploading pictures
$('#upvote').click(function(){
  axios.post(window.location.pathname + '/upvote', {
      upvoted: true
    })
    .then(function (response) {
      // {votes: number}
      console.log(response);
      Materialize.toast('Upvoted!', 4000)
      $('#votes')[0].textContent = "Votes: " + response.votes;
    })
    .catch(function (error) {
      console.log(error);
    });
});
