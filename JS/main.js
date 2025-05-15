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
async function getData() {
  try {
    const response = await fetch('hangman_words.json');
    const data = await response.json();
    //Get Random Property
    let allKeys = Object.keys(data);
    //Random Number Depend On Keys Length
    let randomPropNumber = Math.floor(Math.random() * allKeys.length);
    //Category
    let randomPropName = allKeys[randomPropNumber];
    //Category Words
    let randomPropValue = data[randomPropName];
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
        emptySpan.classList.add("done")
      }
      //Append Span To The Letters Guess Cotainer
      lettersGuessContainer.appendChild(emptySpan);
    });
    //Select Guess Spans
    let guessSpans = document.querySelectorAll(".letters-guess span")

    //Set Wrong Attempts
    let wrongAttempts = 0;

    //Select The Draw Element
    let theDraw = document.querySelector(".hangman-draw");

    // Hedle Clicking On Letters 
    document.addEventListener("click", (e) => {

      // Set The Chose Status
      let theStatus = false;

      if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");
        //Get Clicked Letter 
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        //The Chosen Word
        let theChoseWord = Array.from(randomValueName.toLowerCase());
        theChoseWord.forEach((wordLetter, WordIndex) => {
          //If The Clicked Letter Equal To One Of The Chosen Word Letter 
          if (theClickedLetter == wordLetter) {
            //Set Status To Correct 
            theStatus = true;
            //Loop On All Guess Spans
            guessSpans.forEach((span, SpanIndex) => {
              if (WordIndex === SpanIndex) {
                span.innerHTML = wordLetter;
                span.classList.add("done")
              }
            });
          }
        });
        //If Letter Is Wrong
        if (theStatus !== true) {
          // Increase The Wrong Attempts
          wrongAttempts++;
          //Add Class Wrong On The Draw Element 
          theDraw.classList.add(`wrong-${wrongAttempts}`);
          // Play Fail Sound
          document.getElementById("fail").play();
          if (wrongAttempts === 8) {
            enGame();
            lettersContainer.classList.add("finished");
          }
        } else {
          // Play Success Sound
          document.getElementById("success").play();
          let doneSpan = document.querySelectorAll(".letters-guess .done")
          if (doneSpan.length === randomValueName.length) {
            won();
          }
        }
      }
    })

    // End Game Function 
    function enGame() {
      //Create Popup Div & Button
      let div = document.createElement("div");
      let but = document.createElement("button");
      let wordSpan = document.createElement('span');
      //Create Text 
      let spanText = document.createTextNode(`${randomValueName}`)
      let divText = document.createTextNode(`Game Over, The Word Is `);
      let butText = document.createTextNode('Try Again')
      //Append Text To Div & Button 
      div.appendChild(divText);
      but.appendChild(butText);
      wordSpan.appendChild(spanText)
      //Appen The Button To Div
      div.appendChild(wordSpan);
      div.appendChild(but);

      //Add Class On Div & Button 
      div.className = 'popup';
      but.className = 'but';
      wordSpan.className = 'correct-word'

      //Append To The Body 
      document.body.appendChild(div);

      //Butoon Event 
      but.addEventListener('click', (e) => {
        location.reload()
      })
    }

    function won() {
      let div = document.createElement("div");
      let but = document.createElement("button");
      //Create Text 
      let divText = document.createTextNode(`Congratulations, you won! ${wrongAttempts} wrongs`);
      let butText = document.createTextNode('Continue')
      //Append Text To Div & Button 
      div.appendChild(divText);
      but.appendChild(butText);
      //Appen The Button To Div
      div.appendChild(but);
      //Add Class On Div & Button 
      div.className = 'popup';
      but.className = 'but'

      //Append To The Body 
      document.body.appendChild(div);

      //Butoon Event 
      but.addEventListener('click', (e) => {
        location.reload()
      })
    }

  }
  catch {
    console.error('Error:', error);
  }
}

getData()