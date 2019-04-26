document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM loaded!");
  // Reset - Game Start
  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  }
	})

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  var categories;         // Array of topics
  var chosenCategory;     // Selected category
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Geuss
  var guesses = [ ];      // Stored guesses
  var lives ;             // Lives
  var counter ;           // Count correct guesses
  var space;              // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCategory = document.getElementById("scategory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");





  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');
    
    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.textContent = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }
  // console.log("myButtons", list);
    
  
  // Select category
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      categoryName.textContent = "The Random Category Is Dead GOT Characters";
    } else if (chosenCategory === categories[1]) {
      categoryName.textContent = "The Random Category Is Movies";
    } else if (chosenCategory === categories[2]) {
      categoryName.textContent = "The Random Category Is Cities";
    }
  }

  // Create guesses ul
  result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }
  
  // Show lives
  comments = function () {
    showLives.textContent = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.textContent = "You're DEAD!";
    }
    for (var i = 0; i < guesses.length; i++) {
      if (counter + space === guesses.length) {
        showLives.textContent = "You Win!";
      }
    }
  }

      // Animate man
  var animate = function () {
    var drawMe = lives ;
    drawArray[drawMe]();
  }
  
  // Hangman
  canvas =  function(){
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };
  
  head = function(){
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI*2, true);
    context.stroke();
  }
  
  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke(); 
  }

  frame1 = function() {
    draw (0, 150, 150, 150);
  };
  
  frame2 = function() {
    draw (10, 0, 10, 600);
  };

  frame3 = function() {
    draw (0, 5, 70, 5);
  };

  frame4 = function() {
    draw (60, 5, 60, 15);
  };

  torso = function() {
    draw (60, 36, 60, 70);
  };

  rightArm = function() {
    draw (60, 46, 100, 50);
  };

  leftArm = function() {
    draw (60, 46, 20, 50);
  };

  rightLeg = function() {
    draw (60, 70, 100, 100);
  };

  leftLeg = function() {
    draw (60, 70, 20, 100);
  };

  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 


// OnClick Function
  check = function () {
    list.onclick = function () {
      var guess = (this.textContent);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].textContent = guess;
          counter += 1;
        } 
      }
      var j = (word.indexOf(guess));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }
  
    
  // Play
  play = function () {
    categories = [
        ["ser-meryn-trant", "shae", "ramsay-bolton", "oberyn-martell", "shireen-baratheon", "hizdahr-zo-loraq", "walder-frey"],
        ["anchorman", "this-is-spinal-tap", "the-big-lebowski", "airplane", "caddyshack"],
        ["manchester", "milan", "madrid", "amsterdam", "prague"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    guesses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    canvas();
  }

  play();
  
  // Hint

    hint.onclick = function() {

      hints = [
        ["Beats little girls", "...men call me often", "...forgot to feed the dogs!", "I'm crushing your skull", "Mmmm... charred sacrificial lamb", "That's some pretty tepid kisses you got there, bud.", "Dad! Dad, it's me! Here, in the sandwich!"],
        ["Why don't you go back to your home on Whore Island", "You can't really dust for vomit.", "Careful man, there's a beverage here.", "You can tell me, I'm a doctor", "This is your wife, huh? Hey baby, you must’ve been something before electricity."],
        ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]
    ];

    var categoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: - " +  hints [categoryIndex][hintIndex];
  };
