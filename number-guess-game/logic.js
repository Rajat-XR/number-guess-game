const guess = document.querySelector("#guess");
const startbtn = document.querySelector("#startbtn");
const enterbtn = document.querySelector("#enterbtn");
const trybtn = document.querySelector("#trybtn");
const resetbtn = document.querySelector("#resetbtn");
const startmsg = document.querySelector(".start_msg");
const winmsg = document.querySelector("#win_msg");
const min = 0;
const max = 100;
let randomnum;
let lives = 5;
let ans;
const audio = new Audio("start.mp3");
const win = new Audio("win.mp3");
const gameover = new Audio("gameover.mp3");

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#lives").innerHTML = `Lives: ${lives}`;
    guess.disabled = true;
    enterbtn.disabled = true;
    trybtn.disabled = true;
    resetbtn.disabled = true;

    startbtn.addEventListener("click", function () {
        audio.play();
    });

    resetbtn.addEventListener("click", function () {
        audio.pause();
        audio.currentTime = 0;
    });

    startbtn.onclick = () => {
        startmsg.innerHTML = `Enter Any Number (0-100)`
        startbtn.disabled = true;
        guess.disabled = false;
        resetbtn.disabled = false;
        randomnum = Math.floor(Math.random() * (max - min + 1) + min);
        console.log(randomnum);
    }

    guess.onkeyup = () => {
        if (guess.value.length > 0 && guess.value != " ") {
            enterbtn.disabled = false;
        }
        else {
            enterbtn.disabled = true;
        }
    }

    trybtn.onclick = () => {
        if (ans == randomnum) {
            winmsg.innerHTML = "<img src=\"yes.gif\" width=\"250px\">";
        }
        else if (lives > 0) {
            guess.disabled = false;
            enterbtn.disabled = false;
            trybtn.disabled = true;
            winmsg.innerHTML = "";
        }
        else {
            winmsg.innerHTML = "<img src=\"pay.jpg\" width=\"250px\">";
        }
    }

    enterbtn.onclick = () => {
        ans = Number(guess.value);
        if (isNaN(ans)) {
            winmsg.innerHTML = `${guess.value} is not a number (Enter a Number)`;
        }
        else {
            if (ans === randomnum) {
                winmsg.innerHTML = "<img src=\"yes.gif\" width=\"250px\">";
                guess.disabled = true;
                enterbtn.disabled = true;
                trybtn.innerHTML = "YOU WON !!";
                trybtn.disabled = false;
                win.play();
                audio.pause();
                audio.currentTime = 0;
            }
            else {
                lives--;
                document.querySelector("#lives").innerHTML = `Lives: ${lives}`;
                if (lives > 0) {
                    winmsg.innerHTML = `Lost (${ans} is a Incorrect Guess)`
                    guess.disabled = true;
                    trybtn.disabled = false;
                    enterbtn.disabled = true;
                }
                else if (lives == 0) {
                    winmsg.innerHTML = "<img src=\"gameover.gif\" width=\"200px\">";
                    guess.disabled = true;
                    trybtn.innerHTML = "Purchase More Lives";
                    trybtn.disabled = false;
                    enterbtn.disabled = true;
                    gameover.play();
                    audio.pause();
                    audio.currentTime = 0;
                }
            }
        }
        guess.value = "";
    }

    resetbtn.onclick = () => {
        startbtn.disabled = false;
        guess.disabled = true;
        guess.value = "";
        winmsg.innerHTML = "";
        enterbtn.disabled = true;
        startmsg.innerHTML = ""
        trybtn.disabled = true;
        resetbtn.disabled = true;
        lives = 5;
        document.querySelector("#lives").innerHTML = `Lives: ${lives}`;
        trybtn.innerHTML = "Try Again";
        audio.pause();
        gameover.pause();
        win.pause();
        audio.currentTime = 0;
        gameover.currentTime = 0;
        win.currentTime = 0;
    }

})