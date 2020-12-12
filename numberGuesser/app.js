// game values
let min = 1,
    max = 10,
    winningNumber = getRandom(min, max),
    guessesLeft = 3;

// UI elements
const game = document.getElementById('game'),
    minNum = document.querySelector('.min-num')
    maxNum = document.querySelector('.max-num')
    guessBtn = document.querySelector('#guess-btn')
    guessInput = document.querySelector('#guess-input')
    message = document.querySelector('.message');

// assign UI min an dmax
minNum.textContent = min
maxNum.textContent = max

game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload()
    }
})

guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value)
    console.log(guess)

    // validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red') 
    }

    // game logic
    if(guess === winningNumber){
        gameOver(true, `${winningNumber} is correct, you win!`)
    } else{
        guessesLeft -= 1 
        if(guessesLeft === 0){
            gameOver(false, `${guess} is not correct. ${guessesLeft} guesses left`)
        } else{
            guessInput.value = ''
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
        }
    }
})




function gameOver(won, msg){
    let color;
    if(won === true){
        color = 'green'
        setMessage(msg, color)
    } else{
        color = 'red'
        setMessage(msg, color)
    }
    guessInput.disabled = true

    guessBtn.value = 'Play Again?'
    guessBtn.className += 'play-again'
}

function setMessage(msg, color){
    guessInput.style.borderColor = color
    message.style.color = color
    message.textContent = msg
}

function getRandom(){
    return Math.floor(Math.random() * (max-min+1) + min)
}