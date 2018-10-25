//Luke Donald
//INFO2180 Project 2
//ID No. 620103232


window.onload = function() {

	var puzzleboard = document.getElementById("puzzlearea");
	var puzzlepiece = puzzleboard.getElementsByTagName("div");
	var shufflebutton = document.getElementById("shufflebutton");

	var emptySlotXY = "300px 300px"; //puts the empty square in the bottom right

	startBoard();

	// displays the playing board correctly on opening the web page
	function startBoard(){

		//assigns css class "puzzlepiece" style to each piece
		for (var i = 0; i < puzzlepiece.length; i++){

			puzzlepiece[i].classList.add("puzzlepiece");

			//used to calculate position of tiles in the puzzle as backgroundPosition left, top
			var colPosn = (i % 4) * 100 + "px";
			puzzlepiece[i].style.left = colPosn;

			var rowPosn = (parseInt(i/4) * 100) + "px"; //parseInt is used to perfom integer division
			puzzlepiece[i].style.top = rowPosn;

			//sets the backGroundPositions for the starting grid
			puzzlepiece[i].style.backgroundPosition = "-" + colPosn + " -" + rowPosn;

		}




	}








	

};