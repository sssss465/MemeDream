import Materialize from 'materialize-css/dist/js/materialize.min.js';
import '../stylesheets/style.css';
import 'materialize-css/dist/css/materialize.min.css';
import axios from 'axios';
// import './styletest.css';
console.log('hello from webpack');

$(document).ready(function(){
     $('.carousel').carousel();
});
/////////////////// ajax for upvoting pictures
$('#upvote').click(async function (){
  try {
    const response = await axios.post(window.location.pathname + '/upvote', {upvoted: true});
    console.log(response);
    Materialize.toast('Upvoted!', 4000)
    console.log(response.data);
    $('#votes')[0].textContent = "Votes: " + response.data.votes;
  } catch (err){
    console.log(err);
  }
  // axios.post(window.location.pathname + '/upvote', {
  //     upvoted: true
  //   })
  //   .then(function (response) {
  //     // {votes: number}
  //     console.log(response);
  //     Materialize.toast('Upvoted!', 4000)
  //     console.log(response.data);
  //     $('#votes')[0].textContent = "Votes: " + response.data.votes;
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
});
