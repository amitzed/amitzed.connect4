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
  // creating a method
  // createGridis being used to make several DIVs
  makeBoard() {
    // below the DOM will be used
    const $board = $(this.selector);
    // console.log($board);
    $board.empty(); //will remove old html elements from the board when restart is pressed.
    this.gameOver = false;
    this.player = 'red';
    // Create 6 row with a For loop
    for (let row = 0; row < this.ROWS; row++) {
      const $row = $('<div>') //create a DIV
        .addClass('row'); //added Class called "row"
        //  Create 6 colums with a For loop
    for (let col = 0; col < this.COLS; col++) {
      const $col = $('<div>') //create another DIV
        .addClass('col empty') //added Class called "col empty"
        .attr('data-col', col) //you can pass the desired attribute (the column index)
        .attr('data-row', row); //pass attribute for ROW index

        //  Create 6 colums with a For loop
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
      const cells = $(`.col[data-col='${col}']`); //get all the colums that have the same attribute data-col equal to the column index that was passed inside.
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

      const winner = that.checkForWinner($lastEmptyCell.data('row'), $lastEmptyCell.data('col')
    )
      if (winner) {
        that.gameOver = true;
        alert(`Game Over! Player ${that.player} has won!`); //if TRUE boolean printed, then THIS alert will appear.
        $('.col.empty').removeClass('empty'); //this makes sure that after game is over/won, that the hover-highlight function disables and POINTER-Cursor goes away.
        return;
      }

      that.player = (that.player === 'red') ? 'black' : 'red';
      // ABOVE will alternate between placing a black chip and a red chip.
      that.playerMove(); //to rotate if it's black or red game turn
      $(this).trigger('mouseenter');

    });
  }

  checkForWinner(row, col) {
    // ABOVE created a function to check for the winner to check if there is a horizonal/diagonal/verticle four chip match and that will signal the end of the game.
    const that = this;

    function $getCell(i, j) {
      return $(`.col[data-row='${i}'][data-col='${j}']`);
    }

    function checkDirection(direction) {
      let total = 0;
      let i = row + direction.i;
      let j = col + direction.j;
      let $next = $getCell(i, j);
     while (i >= 0 &&
       i < that.ROWS &&
       j >= 0 &&
       j < that.COLS &&
       $next.data('player') === that.player
     ) {
      total++;
      i += direction.i;
      j += direction.j;
      $next = $getCell(i, j);
      }
      return total;
    }

    function checkWin(directionA, directionB) {
      const total = 1 +  //keeping track of the totals
        checkDirection(directionA) +
        checkDirection(directionB);
      if (total >= 4) {
        return that.player;
      } else {
        return null;
      }
    }

    // For diagonals, there are TWO functions as opposed to One(each) for Horizonal and Verticle Check winners.
    function checkDiagonalBLtoTR() { //checks bottm left to top right
      return checkWin({i: 1, j: -1}, {i: 1, j: 1}); //here i = DOWN and j = Negative to the LEFT and ALSO after, i = Positive UP and j = to the RIGHT
    }

    function checkDiagonalTLtoBR() { //checks TOP left to BOTTOM right
      return checkWin({i: 1, j: 1}, {i: -1, j: -1});
    }


    function checkVerticals() {
      // BELOW to check for winners in the UP direction and then the DOWN direction
      return checkWin({i: -1, j: 0}, {i: 1, j: 0});
    }

    function checkHorizontals() {
      // BELOW to check for winners in the LEFT direction and then the RIGHT direction
      return checkWin({i: 0, j: -1}, {i: 0, j: 1});
    }

   return checkVerticals() || checkHorizontals() || checkDiagonalBLtoTR() || checkDiagonalTLtoBR();
 }

 playagain () {
   this.makeBoard();
   this.playerMove();
 }
}
