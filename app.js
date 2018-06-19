
// first make grid
$(document).ready(function() {
  const connect4 = new Connect4('#connect4')

  // BELOW add a callback listener to rotate if it's black or red game turn (see connectfour.js for more)
  connect4.playerMove = function() {
    $('#player').text(connect4.player);
  }
  $('#playagain').click(function() {
    connect4.playagain();
  })
});
