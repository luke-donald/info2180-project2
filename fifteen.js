//Luke Donald
//INFO2180 Project 2
//ID No. 620103232

//end-of-game notification was added as the extra feature for this project.

window.onload = function() {

	var puzzleboard = document.getElementById("puzzlearea");
	var puzzlepiece = puzzleboard.getElementsByTagName("div");
	var shufflebutton = document.getElementById("shufflebutton");

	var emptyX = 300; //left value for blank slot
	var emptyY = 300; //top value for blank slot

	var winningState = [];

	startBoard();

	shufflebutton.onclick = shuffleBoard;

	// displays the playing board correctly on opening the web page
	function startBoard(){

		//assigns css class "puzzlepiece" style to each piece
		//performs every and any logic that all puzzle pieces would need applied to them individually
		for (var i = 0; i < puzzlepiece.length; i++){

			puzzlepiece[i].classList.add("puzzlepiece");

			//used to calculate position of tiles in the puzzle as backgroundPosition left, top
			var colPosn = (i % 4) * 100 + "px";
			puzzlepiece[i].style.left = colPosn;

			var rowPosn = (parseInt(i/4) * 100) + "px"; //parseInt is used to perfom integer division
			puzzlepiece[i].style.top = rowPosn;

			//sets the backGroundPositions for the starting grid
			puzzlepiece[i].style.backgroundPosition = "-" + colPosn + " -" + rowPosn;


			puzzlepiece[i].addEventListener("click", movePiece);
			puzzlepiece[i].addEventListener("mouseover", hoverValidCheck); //used to add movable piece class
			puzzlepiece[i].addEventListener("mouseout", hoverValidCheck2); //used to remove movable piece class

			//stores the completed state for puzzle
			winningState[i] = colPosn + rowPosn;

		}

	}

	//function for swapping a puzzle piece and the empty slot beside it, if there is one
	function emptyPieceSwap(piece){ 

		if (testForAvailableMove(piece.style.left, piece.style.top)){

			//temporary variables for swapping coordinates of empty slot and piece being moved
			var tempX = piece.style.left;
			var tempY = piece.style.top;

			//giving the piece to me moved a new set of coordinates
			piece.style.left = emptyX + "px";
			piece.style.top = emptyY + "px";

			//updating the new empty spot on the board with suitable coordinates
			emptyX = parseInt(tempX);
			emptyY = parseInt(tempY);

		}
	}

	//this function uses a helper function to test the validity of a move and then perform it.
	//it then checks if the player has won the game
	function movePiece(event){

		//run emptyPieceSwap to make the actual move
		emptyPieceSwap(this);

		//test for win conditions using winningState array

		var pass = 0;

		for (var i = 0; i < puzzlepiece.length; i++) {

			if (puzzlepiece[i].style.left + puzzlepiece[i].style.top == winningState[i]){

				//pass state remains as true
			} else {

				//pass state changes to false
				pass++;
			}
		}

		if (pass == 0){
			//if the puzzle is in it's winning state, then...
			//change header text to notify user of the win
			//change it's font, colour, and background colour
			//also change the board so that all borders are red and all text is green
			//this is similar to the indication given when a puzzle piece is highlighted as a movable piece

			var temp = document.getElementsByTagName("h1")[0];

			temp.textContent = "BING BING BING !!! CONGRATULATIONS !!!";
			temp.style.color = "#006600";
			temp.style.backgroundColor = "red";
			temp.style.fontFamily = "Comic Sans MS";

			for (var i = 0; i < puzzlepiece.length; i++) {

				puzzlepiece[i].style.border = "2px solid red";
				puzzlepiece[i].style.color = "#006600";
				puzzlepiece[i].style.textDecoration = "underline";
			}
		}

	}

	//function used to test if the coordinates of a certain puzzle piece allow that puzzle piece to be moved into a blank space or not
	function testForAvailableMove(coordx, coordy){

		var tempX = parseInt(coordx);
		var tempY = parseInt(coordy);

		//absolute values will result in answer always being positive, so no discrepancy between + and - 100
		//Basically checks if the tile can be moved to the left or right
		//afterwards, checks if it can be moved up or down if it could not previously be moved

		if (Math.abs(emptyX - tempX) == 100) {
			if (Math.abs(emptyY - tempY) == 0) {
				return true;
			}
		} 

		if (Math.abs(emptyY - tempY) == 100) {
			if (Math.abs(emptyX - tempX) == 0) {
				return true;
			}
		}

		return false;
	}

	//function used to add movable piece class for formatting purposes
	function hoverValidCheck(event){

		if (testForAvailableMove(this.style.left, this.style.top)){

			this.classList.add("movablepiece");

		}

	}

	//function used to remove movable piece class for formatting purposes
	function hoverValidCheck2(event){

		this.classList.remove("movablepiece");
	}

	//function used to shuffle board at the click of the button
	function shuffleBoard(){

		//This function will perform the following steps in order to shuffle the board
		//Step 1 - create an empty, temporary array
		//Step 2 - store all movable pieces in that array
		//Step 3 - select a random piece in that array
		//Step 4 - move that piece into the empty space on the board
		//Step 5 - declare the array as empty again
		//Step 6 - repeat the process a few hundred times

		var count = 0;

		while(count != 600){

			var temporaryArray = [];

			for (var i = 0; i < puzzlepiece.length; i++){

				if (testForAvailableMove(puzzlepiece[i].style.left, puzzlepiece[i].style.top)){

					temporaryArray.push(puzzlepiece[i]);
				}
			}

			var n = temporaryArray.length;
			emptyPieceSwap(temporaryArray[Math.floor(Math.random() * n)]);
			count++;
		}
	}


};

