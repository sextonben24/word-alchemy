const dictionary = new Set([
  "burn", "born", "boon", "cool", "corn", "curl", "cork", "curb", "burl", "turn",
  "bunk", "bank", "bark", "barn", "bull", "call", "ball", "cook", "book", "look"
]);

const startWord = "BURN";
const endWord = "COOL";
const maxMoves = 6;

document.getElementById("start-word").textContent = startWord;
document.getElementById("end-word").textContent = endWord;

const inputsDiv = document.getElementById("inputs");

for (let i = 0; i < maxMoves; i++) {
  const row = document.createElement("div");
  row.className = "word-box";
  row.innerHTML = `
    <input maxlength="1" />
    <input maxlength="1" />
    <input maxlength="1" />
    <input maxlength="1" />
  `;
  inputsDiv.appendChild(row);
}

function checkAnswers() {
  let current = startWord.toLowerCase();
  let resultText = "";
  let stars = 1;
  const rows = document.querySelectorAll(".word-box");
  let success = false;

  for (let i = 0; i < rows.length; i++) {
    const inputs = rows[i].querySelectorAll("input");
    const word = Array.from(inputs).map(input => input.value.toLowerCase()).join("");

    if (word.length !== 4 || !dictionary.has(word)) {
      resultText = `❌ Invalid word on line ${i + 1}: "${word.toUpperCase()}"`;
      break;
    }

    let diff = 0;
    for (let j = 0; j < 4; j++) {
      if (current[j] !== word[j]) diff++;
    }

    if (diff !== 1) {
      resultText = `⚠️ You must change only 1 letter. Error on line ${i + 1}.`;
      break;
    }

    current = word;

    if (current === endWord.toLowerCase()) {
      success = true;
      if (i === 2) stars = 4;
      else if (i === 3) stars = 3;
      else if (i === 4) stars = 2;
      else stars = 1;
      resultText = `🎉 Success in ${i + 1} moves! ⭐️ x${stars}`;
      break;
    }
  }

  if (!success && resultText === "") {
    resultText = `❌ You didn't reach the final word in time.`;
  }

  document.getElementById("result").textContent = resultText;
}
