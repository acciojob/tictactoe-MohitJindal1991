const submitButton = document.querySelector("#submit");
const Player1 = document.querySelector("#player1");
const Player2 = document.querySelector("#player2");
const Name = document.querySelector("#name");
const boxes = document.querySelector("#boxes");

submitButton.addEventListener('click', () => {
	turn = true;
	Name.innerText = `${Player1.value}, you're up`;
	boxes.style.display = "grid";
});

const win = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

let turn = true;

boxes.addEventListener('click', (e) => {
	const box = document.getElementById(e.target.id);
	if (box.classList.contains("box") && box.innerText == "") {
		box.innerText = turn ? "X" : "O";
		box.style.pointerEvents = "none"; // Disable further clicks
		let winner = checkWinner();
		if (winner) {
			Name.innerText = `${winner === "X" ? Player1.value : Player2.value}, congratulations you won!`;
			document.querySelectorAll(".box").forEach(box => box.style.pointerEvents = "none"); // Stop game
			return;
		} else if (checkDraw()) {
			Name.innerText = "It's a draw!";
			return;
		}
		turn = !turn;
		Name.innerText = `${turn ? Player1.value : Player2.value}, you're up`;
	}
});

function checkWinner() {
	const allBoxes = document.querySelectorAll(".box");

	for (let pattern of win) {
		const [a, b, c] = pattern;

		if (allBoxes[a].innerText !== "" && allBoxes[a].innerText === allBoxes[b].innerText && allBoxes[a].innerText === allBoxes[c].innerText) {
			allBoxes[a].style.backgroundColor = "#800080"; // Purple color
			allBoxes[b].style.backgroundColor = "#800080"; // Purple color
			allBoxes[c].style.backgroundColor = "#800080"; // Purple color

			return allBoxes[a].innerText;
		}
	}
	return null;
}

function checkDraw() {
	return [...document.querySelectorAll(".box")].every(box => box.innerText !== "");
}
