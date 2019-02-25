/*
 * Create a list that holds all of your cards
 */
var cards = ["fa-otter", "fa-hippo", "fa-fish", "fa-dragon", "fa-cat", "fa-dog", "fa-frog", "fa-horse", "fa-otter", "fa-hippo", "fa-fish", "fa-dragon", "fa-cat", "fa-dog", "fa-frog", "fa-horse"]
var stars = document.querySelectorAll(".fa-star");
var movesCount = 0;
var starCount = 3;

//when page loads or game reloads
function pageLoad() {
    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    cards = shuffle(cards);
    
    //create HTML for each card
    function createCard(card) {
        return '<li class="card" data-card="' + card + '"><i class="fas ' + card + '" ></i></li>';
    }
    //add card HTML to page
    function generateCards() {
        const deck = document.querySelector('.deck');
        const cardHTML = cards.map(function(card) {
            return createCard(card);
        });
        deck.innerHTML = cardHTML.join('');
    }

    generateCards();
    loadCards();
}
pageLoad();

// timer
var timerOutput = document.querySelector(".timer");

let sec = 0;
let min = 0;
let timer;  

// start the timer
function startTimer() {
    timer = setInterval(insertTime, 1000);
}
startTimer();

// stop the timer
function stopTimer() {
    clearInterval(timer);
   
}
function resetTimer() {
    sec = 0;
    min = 0;
    timer = setInterval(insertTime, 1000);
}

// insert time into time output html
function insertTime() {
    sec++;

    if (sec < 10) {
    sec = "0" + sec;
    }

    if (sec >= 60) {
    min++;
    sec = "00";
    }

// display time
timerOutput.innerHTML = "0" + min + ":" + sec;
}
//reset game, timer, moves
function reset() {
    stopTimer();
    resetTimer();
    movesCount = 0;
    countMoves();
    pageLoad();
    starCount = 3;
}

//counting # of moves
function countMoves() {
    const moves = document.querySelector('.moves');
    moves.innerText = movesCount;
}

//restarting the game
const restartIcon = document.querySelector('.restart');
restartIcon.addEventListener('click', reset);

//display modal once player has made all matches
function displayModal() {
    $("#winner").modal('show');

    // show the # of Moves 
    const movesModal = document.querySelector("#movesOutcome");
    movesModal.innerHTML = "you finished in " + movesCount + " moves";

    // show the time
    const timeModal = document.querySelector('#timerOutcome');
    timeModal.innerHTML = "and only took you 0" + min + ":" + sec + " to minutes to finish";

    // show the stars rating
    const starsModal = document.querySelector('#starsOutcome');
    starsModal.innerHTML = "with a rating of " + starCount + " stars!";

    //reset button
    const restartModal = document.querySelector('#restartButton');
    restartModal.addEventListener('click', reset);
}
//runs when page loads or when game is restarted
function loadCards() {

    var cardsAll = document.querySelectorAll('.card');
    var cardsOpen = [];
    var countClicks = 0;
    var cardsMatch = 0;

    cardsAll.forEach(function(card) {
        card.addEventListener('click', function(el) {
            
            if (countClicks <= 2) {
                countClicks += 1;
                if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
                            cardsOpen.push(card);
                            card.classList.add('open', 'show');

                            if (cardsOpen.length == 2) {
                                if (cardsOpen[0].dataset.card == cardsOpen[1].dataset.card) {
                                    cardsOpen[0].classList.add('match');
                                    cardsOpen[0].classList.remove('open');
                                    cardsOpen[0].classList.remove('show');

                                    cardsOpen[1].classList.add('match');
                                    cardsOpen[1].classList.remove('open');
                                    cardsOpen[1].classList.remove('show');

                                    cardsOpen = [];
                                    cardsMatch += 1;
                                    countClicks = 0;

                                    if (cardsMatch == 8) {
                                        stopTimer();
                                        displayModal();
                                       }

                                } else {
                                    setTimeout(function() {
                                        cardsOpen.forEach(function(card) {
                                        card.classList.remove('open', 'show');  
                                        });
                                        cardsOpen = []; 
                                        countClicks = 0;
                                    }, 1000); 
                                     
                                }
                                movesCount += 1;
                                countMoves();
                                
                            } 
                            
                        } 
            } 
            // star rating based on moves
            function starRating () {
                if (movesCount > 8 && movesCount < 15) {
                    for (i = 0; i < 3; i++) {
                        if (i > 1) {
                            stars[i].style.visibility = "hidden";
                            starCount = 2; 
                            console.log("stars" + starCount);
                        }                        
                    }
                } else if (movesCount >= 15) {
                    for (i = 0; i < 3; i++) {
                        if (i > 0) {
                            stars[i].style.visibility = "hidden";
                            starCount = 1;
                            console.log("stars" + starCount);
                        }
                    }
                }
            }
            starRating();
        });     

    });
   
    
};







    

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 // cards



