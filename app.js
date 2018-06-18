// const grid = [
//   [{},{},{},{},{},{},{}],
//   [{},{},{},{},{},{},{}],
//   [{},{},{},{},{},{},{}],
//   [{},{},{},{},{},{},{}],
//   [{},{},{},{color:'red'},{},{},{}],
// ];
//
// // Render func
// const render = ()=>{
//   // call Render
//   // below string statement = the board
//   const doc = ``;
//   // FOR loop below will loop TWICE
//   for (let i = 0; i < grid.length, i++) {
//     // what the row will be equal to:
//     let row = grid[i];
//     // below a FOR loop to loop ovr EACH square
//     for (let j = 0; j < row.length j++) {
//
//     }
//   }
// };

// first make grid
$(document).ready(function() {
  const connect4 = new Connect4('#connect4')

  // BELOW add a callback listener to rotate if it's black or red game turn (see connectfour.js for more)
  connect4.onPlayerMove = function() {
    $('#player').text(connect4.player);
  }
  $('#playagain').click(function() {
    connect4.playagain();
  })
});
