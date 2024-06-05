// Mithulan Nanthakumar, May 30th 2024
// important variables
const imgList = [1, 2, 3, 4, 5, 6, 7, 8, 19, 10, 11, 12, 13, 14, 15, 16, 17, 19, 1, 2, 3, 4, 5, 6, 7, 8, 19, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const container = document.querySelector("#container");
const btn = document.querySelector(".resetBtn");
const timer = document.querySelector(".timer");
let mistakes = 0;
let time = 180;
let score = 0;

let count = 0;
let imgs = [];


// functions
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

// flip card
function reveal(n, count, imgs, num) {
    if (imgs.length >= 2) {
        imgs = []
    }
    count += 1
    imgs.push([n, num]);

    // flip
    let card = document.getElementById("card-" + n);
    if (card) {
        if (card.classList == "card") {
            card.style.cssText = "transform: rotateY(180deg);"
            card.classList.toggle("flipped");
            count = setTimeout(check, 2000, n, count, imgs)
        }
    }
    return [count, imgs];

}

// check for a match
function check(n, count, imgs) {
    let card = document.querySelector("#card-" + n);
    let otherCard = document.querySelector("#card-" + imgs[0][0]);
    if (imgs.length == 2) {
        // if a match
        if (imgs[1][1] === imgs[0][1]) {
            card.classList.toggle("match");
            otherCard.classList.toggle("match");
            score += 0.5;
        } 
        // no match
        else {
            card.style.cssText = "transform: rotateY(0deg);"
            card.classList.toggle("flipped");
            if (otherCard) {
                otherCard.style.cssText = "transform: rotateY(0deg);"
                otherCard.classList.toggle("flipped");
            }
            mistakes += 0.5;
        }
        imgs = [];
        count = 0;
    }

    // alert game end messages
    if (mistakes >= 7) {
        alert("You Lose :(");
        window.location.reload();
    } else if (score == 18) {
        alert("You Win!");
        window.location.reload();
    }
    return count
}

// lower time and update scores and mistakes
function countdown() {
    time -= 1;
    if (time < 0) {
        time = 0;
    }
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    timer.innerHTML = minutes + ":" + seconds;

    // lose message if you run out of time
    if (time == 0) {
        alert("You Lose :(");
        window.location.reload();
    }

    // update trackers
    let mistakesTracker = document.querySelector(".mistakes");
    let scoreTracker = document.querySelector(".score");
    scoreTracker.innerHTML = "Score: " + score;
    mistakesTracker.innerHTML = "Mistakes: " + mistakes;
}

// countdown x times
function setIntervalLimited(callback, interval, x) {

    for (let i = 0; i < x; i++) {
        setTimeout(callback, i * interval);
    }

}

// shuffle the numbers of the images
let shuffledList = shuffle(imgList);

// create the cards
for (let i = 0; i < shuffledList.length; i++) {
    // create img side of card
    let tile = document.createElement("div");
    tile.style.backgroundImage = "url(./image" + shuffledList[i] + ".png)";
    tile.classList += "tileIMG face";

    // create back side
    let cover = document.createElement("div");
    cover.classList += "cover face"

    // create the card container
    let card = document.createElement("div");
    card.classList = "card"
    card.id = "card-" + i
    card.addEventListener("click", function() {
        [count, imgs] = reveal(i, count, imgs, shuffledList[i]);
    });

    // add to parent
    container.append(card);
    card.append(cover);
    card.append(tile);
}

// reset the game by reloading the page
btn.addEventListener("click", function() {
    window.location.reload();
});

// countdown 300 times
setIntervalLimited(countdown, 1000, 300);
