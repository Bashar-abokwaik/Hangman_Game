//Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

//Get Array From Letters
let lettersArray = Array.from(letters);

//Select Letters Container
let lettersContainer = document.querySelector(".letters");

//Generat Letters
lettersArray.forEach((letter) => {
  //Create Span
  let span = document.createElement("span");

  //Create Letter Text Node
  let theLatter = document.createTextNode(letter);

  //Append the Letter To Span
  span.appendChild(theLatter);

  //Add Class On Span
  span.className = "letter-box";

  //Append Span To The Letters Container
  lettersContainer.appendChild(span);
});

//Object Of Words + Categories
const words = {
  Programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstallar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "cleopatra",
    "Mahatma Ghandi",
  ],
  countries: [
    "Syria",
    "Palestine",
    "Jordan",
    "Yemen",
    "Egypt",
    "Bahrein",
    "Qatar",
  ],
};

//Get Random Property

let allKeys = Object.keys(words);

//Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

//Category
let randomPropName = allKeys[randomPropNumber];

//Category Words
let randomPropValue = words[randomPropName];

//Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

//The Chosen Word
let randomValueName = randomPropValue[randomValueNumber];

//Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

//Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

//Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueName);

//Create Spans Depened On Word

lettersAndSpace.forEach((letter) => {
  //Create Empty Span
  let emptySpan = document.createElement("span");

  //If Letter is Space
  if (letter === " ") {
    // Add Class To The Span
    emptySpan.className = "With-Space";
  }

  //Append Span To The Letters Guess Cotainer
  lettersGuessContainer.appendChild(emptySpan);
});

console.log(randomValueName);
