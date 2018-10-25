//Luke Donald
//INFO2180 Project 2
//ID No. 620103232


window.onload = function() {

	var puzzleboard = document.getElementById("puzzlearea");
	var puzzlepiece = puzzleboard.getElementsByTagName("div");
	var shufflebutton = document.getElementById("shufflebutton");

	var emptyX = 300; //left value for blank slot
	var emptyY = 300; //top value for blank slot

	var winningState = [];

	startBoard();

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
			//puzzlepiece[i].addEventListener("mouseover", hoverValidCheck);

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

	function movePiece(event){

		//run emptyPieceSwap to make the actual move
		emptyPieceSwap(this);

		//test for win conditions using winningState array

	}

	function testForAvailableMove(coordx, coordy){

		var tempX = parseInt(coordx);
		var tempY = parseInt(coordy);

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


};

