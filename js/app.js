/*
 * Create a list that holds all of your cards
 */

// const allCards = document.getElementsByClassName("card");
// let deckCards = shuffleAndAssign(allCards, gundams);
let allCards, deckCards;

const gundams = ["exia", "dynames", "kyrios", "virtue", "cherudim", "arios", "seravee", "double00_raiser"];
let flipCount = 0;
let turnCount = 0;

/**
 * Creates the deck and returns all cards in deck
 */
function createDeck() {
    let deckContainer = document.getElementById("deck-container");
    deckContainer.innerHTML = `<div class="card playable">
                <div class="card-mask-active"></div>
            </div>
            <div class="card playable">
                <div class="card-mask-active"></div>
            </div>
            <div class="card playable">
                <div class="card-mask-active"></div>
            </div>
            <div class="card playable">
                <div class="card-mask-active"></div>
            </div>
            <div class="card playable">
                <div class="card-mask-active"></div>
            </div>
            <div class="card playable">
                <div class="card-mask-active"></div>
            </div>
            <div class="card playable">
                <div class="card-mask-active"></div>
            </div>
            <div class="card playable">
                <div class="card-mask-active"></div>
            </div>

            <div class="card playable">
                <div class="card-mask-active"></div>
            </div>
            <div class="card playable">
                <div class="card-mask-active"></div>
            </div>
            <div class="card playable">
                <div class="card-mask-active"></div>
            </div>
            <div class="card playable">
                <div class="card-mask-active"></div>
            </div>
            <div class="card playable">
                <div class="card-mask-active"></div>
            </div>
            <div class="card playable">
                <div class="card-mask-active"></div>
            </div>
            <div class="card playable">
                <div class="card-mask-active"></div>
            </div>
            <div class="card playable">
                <div class="card-mask-active"></div>
            </div>`;

    return document.getElementsByClassName("card");
}

function resetGame() {
    flipCount = 0;
    turnCount = 0;

    allCards = createDeck();
    deckCards = shuffleAndAssign(allCards, gundams);
    updateScore();
    // By default we have a click event listener assigned to all cards
    handleClicks(deckCards);
}





function shuffleAndAssign(cards, values) {
    let assignedCards = [];
    for (card of cards) {
        assignedCard = {
            card: card
        };
        assignedCards.push(assignedCard);
    }

    for (let i = assignedCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [assignedCards[i], assignedCards[j]] = [assignedCards[j], assignedCards[i]];
    }

    // Now assign the value to the card
    for (let i = 0; i < assignedCards.length; i++) {
        const vi = i % values.length;
        assignedCards[i]["value"] = values[vi];
    }

    return assignedCards;
}


// This is our script's entrypoint
function startGame() {
    resetGame();
    const resetBtn = document.getElementById("reset-btn");

    resetBtn.addEventListener("click", function (e) {
        resetGame();
    });
}

startGame();



/**
 * Returns the deck card object for the element.
 * The value null is returned if the deck card cannot be found.
 * @param {HTMLElement} elem the element to look for
 */
function findDeckCard(elem) {
    for (deckCard of deckCards) {
        if (deckCard.card === elem) {
            return deckCard;
        }
    }
    return null;
}

/**
 * Returns the remaining playable cards
 */
function getRemainingPlayableCards() {
    let playableCards = [];
    for (deckCard of deckCards) {
        if (deckCard.card.classList.contains("playable")) {
            playableCards.push(deckCard);
        }
    }
    return playableCards;
}




function handleClicks(assignedCards) {
    for (assignedCard of assignedCards) {
        const v = assignedCard["value"];
        const fn = function (e) {
            e.preventDefault();
            console.log(`Click event on card with value ${v}`);

            e.currentTarget.innerHTML = "";

            e.currentTarget.classList.add("flipped-card");
            e.currentTarget.classList.add("current-card");
            e.currentTarget.classList.add(v);

            ++flipCount;
            console.log(`Flip count ${flipCount}`);
            if (flipCount === 2) {
                setTimeout(function () {
                    console.log("Call match flipped");
                    matchFlipped();
                    flipCount = 0;
                }, 300);


            }
        }

        // Make sure we capture the event on the "card" div and not the inner mask
        let options = { capture: true };
        assignedCard.card.addEventListener("click", fn, options);
        assignedCard["click_function"] = fn;
    }
}

function unregisterClickEvents(assignedCards) {
    for (assignedCard of assignedCards) {
        if (!assignedCard["click_function"]) {
            continue;
        }
        assignedCard.card.removeEventListener("click", assignedCard["click_function"]);
        assignedCard["click_function"] = null;
    }
}

function matchFlipped() {
    let flippedCards = document.getElementsByClassName("current-card");

    // Make all cards not clickable for now
    unregisterClickEvents(deckCards);

    // Increment the number of turns
    ++turnCount;

    let deckCard1 = findDeckCard(flippedCards[0]);
    let deckCard2 = findDeckCard(flippedCards[1]);

    if (!deckCard1 || !deckCard2) {
        console.log(`No deck cards found! [card1=${deckCard1}, card2=${deckCard2}]`);
        // How to best handle this error in the future?
        return;
    }

    console.log(`Deck cards found [card-1=${deckCard1.value}, card-2=${deckCard2.value}]`);
    if (deckCard1.value !== deckCard2.value) {

        deckCard1.card.classList.add("error-card");
        deckCard2.card.classList.add("error-card");

        let endAnimationCount = 0;

        let rmClassFn = function (e) {
            e.preventDefault();
            // e.target.classList.remove("error-card");
            e.target.className = "card playable";
            e.target.innerHTML = `<div class="card-mask-active"></div>`;
            ++endAnimationCount;


            // Only listen this one time
            e.target.removeEventListener("animationend", rmClassFn);

            if (endAnimationCount === 2) {
                let playable = getRemainingPlayableCards();
                handleClicks(playable);
            }

        };
        deckCard1.card.addEventListener("animationend", rmClassFn);
        deckCard2.card.addEventListener("animationend", rmClassFn);

        updateScore();
        return;
    }

    // Now the cards are the same
    deckCard1.card.classList.remove("playable");
    deckCard1.card.classList.remove("current-card");
    deckCard2.card.classList.remove("playable");
    deckCard2.card.classList.remove("current-card");

    deckCard1.card.classList.add("success-card");
    deckCard2.card.classList.add("success-card");

    let playable = getRemainingPlayableCards();
    handleClicks(playable);

    updateScore();
    checkGameFinished();

    return;
}

function checkGameFinished() {
    const succesCards = document.getElementsByClassName("success-card");
    if (succesCards.length < 16) {
        return;
    }

    let body = document.body;
    let successMask = document.createElement("div");
    successMask.classList.add("success-mask");

    let successMaskInnerHTML = `<div class="success-content-container">
        <h2 class="success-title">
        Congratulations!
        </h2>
        <p class="success-text">
        You have successfully completed the Gundam memory game in ${turnCount} moves.
        </p>
        <div class="success-retry-container">
            <button class="btn retry-btn" id="retry-btn">Try again</button>
        </div>
    </div>`;

    body.insertAdjacentElement("afterbegin", successMask);
    successMask.innerHTML = successMaskInnerHTML;

    let retryBtn = document.getElementById("retry-btn");
    let options = { once: true };
    retryBtn.addEventListener("click", function (e) {
        e.preventDefault();

        // Remove the success mask
        successMask.remove();
        // Now the game can be safely reset...
        resetGame();
    });

    return;
}

function updateScore() {
    let scoreElem = document.getElementById("score");
    let movesElem = document.getElementById("moves");

    let scoreStarsHtml = `<i class="fas fa-star star-full"></i>
    <i class="fas fa-star star-full"></i>
    <i class="fas fa-star star-full"></i>`;

    if (turnCount > 8 && turnCount <= 10) {
        scoreStarsHtml = `<i class="fas fa-star star-full"></i>
        <i class="fas fa-star star-full"></i>
        <i class="far fa-star"></i>`;
    } else if (turnCount > 10) {
        scoreStarsHtml = `<i class="fas fa-star star-full"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>`;
    }
    scoreElem.innerHTML = scoreStarsHtml;
    movesElem.textContent = `${turnCount} Moves`;
}

function flipbackCards(...cards) {
    for (card of cards) {
        card.className = "card playable";
    }
}
