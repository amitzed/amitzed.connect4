// Another js file here to connect to declare a class which will ultimately be used with main.js
 // ``BACK-Ticks used below are for STRING INTERPOLATION: a more convenient syntax for mixing string literals with expressions. It's code embedded in a string literal.

class Connect4 {
  constructor(selector) {
    this.ROWS = 6;
    this.COLS = 7;
    this.player = 'red';
    this.selector = selector;
    this.gameOver = false;
    this.playerMove = function() {}; //to rotate if it's black or red game turn
    this.makeBoard();
    this.eventListeners();
  }
  // create a method
  // makeBoard is being used to make several DIVs
  makeBoard() {
    // below the DOM will be used
    const $board = $(this.selector);
    // console.log($board);
    $board.empty(); //will remove old html elements from the board when restart is pressed.
    this.gameOver = false;
    this.player = 'red';
    // Create 6 ROWS with a For loop
    for (let row = 0; row < this.ROWS; row++) {
      const $row = $('<div>') //create a DIV
        .addClass('row'); //added Class called "row"
        //  Create 7 COLUMNS with a For loop
    for (let col = 0; col < this.COLS; col++) {
      const $col = $('<div>') //create another DIV
        .addClass('col empty') //added Class called "col empty"
        .attr('data-col', col) //you can pass the desired attribute (the column index)
        .attr('data-row', row); //pass attribute for ROW index

        //  Create 6 columns with a For loop
     $row.append($col);
    }
     $board.append($row);
    }
  }
// Below, adding Event Listeners
  eventListeners() {
    const $board = $(this.selector);
    // below, whenever we click on an empty column, invoke a function
    const that = this; //to keep reference to the orginal 'this' attribute -- this is involved in being able to switch between players

    function findLastEmptyCell(col) { //declare function
      const cells = $(`.col[data-col='${col}']`); //get all the columns that have the same attribute data-col equal to the column index that was passed inside.
      for (let i = cells.length - 1; i >= 0; i--) {
        const $cell = $(cells[i]); //the above two statements/loop is so that we loop over backwards, can get the jQuery of where we are.
        if ($cell.hasClass('empty')) {
          return $cell;
        }
      }

      return null; //return null otherwise IF cannot return $cell above.
      // console.log(cells);
    }

    $board.on('mouseenter', '.col.empty', function() {
      // When logged below: when entering a cell and hovering over, in console, it prints out the cells that are hovered over.
      // NOW add attributes ABOVE for column & rows so which SPECIFIC row/column can be identified when it's hovered over.
      // console.log('here', this);
      const col = $(this).data('col');
      const $lastEmptyCell = findLastEmptyCell(col);
    $lastEmptyCell.addClass(`next-${that.player}`);
      // now as we hover, it ADDS placeholder
      // console.log(col);
    });

    $board.on('mouseleave', '.col', function() {
      $('.col').removeClass(`next-${that.player}`);
    }); //the 'mouseleave' portion above, the function will REMOVE the last filled circle it added when originally hovered over.
    $board.on('click', '.col.empty', function() {
      if (that.gameOver) return; //want to make other spaces DEACTIVATED when game is won.
      const col = $(this).data('col');
      // const row = $(this).data('row');
      const $lastEmptyCell = findLastEmptyCell(col);
      $lastEmptyCell.removeClass(`empty next-${that.player}`);
      $lastEmptyCell.addClass(that.player); // say "that.player" instead of writing red every time.
      $lastEmptyCell.data('player', that.player);

      const winner = that.whoWon($lastEmptyCell.data('row'), $lastEmptyCell.data('col')
      )
      if (winner) {
        that.gameOver = true;
        alert(`GAME OVER! Player ${that.player} WINS!!`); //if TRUE boolean printed, then THIS alert will appear.
        $('.col.empty').removeClass('empty'); //this makes sure that after game is over/won, that the hover-highlight function disables and POINTER-Cursor goes away.
        return;
      }

      that.player = (that.player === 'red') ? 'black' : 'red';
      // ABOVE will alternate between placing a black chip and a red chip.
      that.playerMove(); //to rotate if it's black or red game turn
      $(this).trigger('mouseenter');

    });
  }

  whoWon(row, col) {
    // ABOVE created a function to check for the winner to check if there is a horizonal/diagonal/verticle four chip match and that will signal the end of the game.
    const that = this;

    function $cell(i, j) {
      return $(`.col[data-row='${i}'][data-col='${j}']`);
    }

    function direction(direction) { //along with checking for winner >= 4, this direction checker checks for wins in different directions.
      let total = 0;
      let i = row + direction.i;
      let j = col + direction.j;
      let $next = $cell(i, j);
      while (i >= 0 &&
       i < that.ROWS &&
       j >= 0 &&
       j < that.COLS &&
       $next.data('player') === that.player //says while the now player is equal to the "emptied" other player, we continue the loop in increments using total++
     ) {
      total++;
      i += direction.i;
      j += direction.j;
      $next = $cell(i, j);
      }
      return total;
    }

    function winner(direction1, direction2) { //direction1 UP; direction2 DOWN
      const total = 1 +  //keeping track of the totals
        direction(direction1) + //this definies direction1 & direction2
        direction(direction2);
      if (total >= 4) {
        return that.player; //if total is >= 4, then will return the winning player.
      } else {
        return null;
        }
    }

    // For diagonals, there are TWO functions as opposed to One(each) for Horizonal and Verticle Check winners.
    function diagonalWinBLtoTR() { //checks bottom left to top right
      return winner({i: 1, j: -1}, {i: 1, j: 1}); //here i = DOWN and j = Negative to the LEFT and ALSO after, i = Positive UP and j = to the RIGHT
    }

    function diagonalWinTLtoBR() { //checks TOP left to BOTTOM right
      return winner({i: 1, j: 1}, {i: -1, j: -1});
    }


    function verticalWin() {
      // BELOW to check for winners in the UP direction and then the DOWN direction
      return winner({i: -1, j: 0}, {i: 1, j: 0});
    }

    function horizontalWin() {
      // BELOW to check for winners in the LEFT direction and then the RIGHT direction
      return winner({i: 0, j: -1}, {i: 0, j: 1});
    }

   return verticalWin() || horizontalWin() || diagonalWinBLtoTR() || diagonalWinTLtoBR();
  }

 playagain () {
   this.makeBoard();
   this.playerMove();
 }
}
