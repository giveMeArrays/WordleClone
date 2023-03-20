const letters = document.querySelectorAll(".alphabet")
const gameRow = document.querySelectorAll(".gameRow")
let currentRow = 0
let currentTile = 0
let userWord = ""
let targetWord = ""
let win = false
let backUpWords = ["LUNCH", "CLOWN", "FAITH", "EARTH", "ELITE", "SHARP", "LUNCH", "TOWEL", "SPACE"]
const enterButton = document.querySelector(".enter")
const clearButton = document.querySelector(".clear")

Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

setTargetWord()
addClickEventToKB()
setUpClearButton()
validateUserWord()

function addClickEventToKB() {
    for (const item of letters) {
        item.style.background = "#818384"
        item.addEventListener("click", () => {
            if (currentTile === 5) {
                return
            }
            userWord += item.innerHTML
            gameRow[currentRow].children[currentTile].innerHTML = item.innerHTML //make var for this
            gameRow[currentRow].children[currentTile].style.animation = "jump 0.4s"
            currentTile++
        })
    }
}

function validateUserWord() {
    enterButton.addEventListener("click", () => {
        if (userWord.length !== 5) {
            alert("Not enough letters")
        }
        else {
            checkWordIsValid()
        }
    })
}


function setUpClearButton() {
    clearButton.addEventListener("click", () => {
        userWord = userWord.substring(0, userWord.length - 1)
        gameRow[currentRow].children[currentTile - 1].innerHTML = ""
        currentTile--
    })
}



async function checkWordIsValid() {
    const wordcheck = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${userWord}`)
    const data = await wordcheck.json()
    console.log(data)
    if (Array.isArray(data)) {
        console.log("valid")
        checkSequence()
        resetUserWordAndRow()
        checkLoss()
    }
    else {
        alert("invalid word")
    }
}

function resetUserWordAndRow() {
    userWord = ""
    currentRow++
    currentTile = 0
}

function checkLoss() {
    if (currentRow > 4 && win === false) {
        setTimeout(() => {
            alert(targetWord)
            document.querySelector(".keyBoard").style.pointerEvents = "none"
        }, 700);

    }
}

async function setTargetWord() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '29d6a287cemsh3e2463647081f31p1218c2jsna4404faf76a8',
            'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
        }
    }

    try {
        let target = await fetch('https://random-words5.p.rapidapi.com/getMultipleRandom?count=1&wordLength=5', option)
        let ArrtargetWord = await target.json()
        targetWord = ArrtargetWord.toString().toUpperCase()
        console.log(targetWord)
    }
    catch {
        targetWord = backUpWords.random()
        console.log(targetWord)
    }
}

function checkSequence() {
    if (userWord === targetWord) {
        win = true
        for (const i in userWord) {
            gameRow[currentRow].children[i].style.background = "#538d4e"
            gameRow[currentRow].children[i].style.animation = "flip 0.4s"
        }
        document.querySelector(".keyBoard").style.pointerEvents = "none"
        setTimeout(() => alert("You Win!!!"), 700)
    }

    for (const character in userWord) {
        let thisTile = gameRow[currentRow].children[character].style
        if (!targetWord.includes(userWord[character])) {
            thisTile.background = "#3a3a3c"
            thisTile.animation = "flip 0.4s"
            let kbTile = document.querySelector(`.${userWord[character].toLowerCase()}`)
            kbTile.style.background = "#3a3a3c"
        }
        else if (targetWord[character] === userWord[character]) {
            thisTile.background = "#538d4e"
            thisTile.animation = "flip 0.4s"
            let kbTile = document.querySelector(`.${userWord[character].toLowerCase()}`)
            kbTile.style.background = "#538d4e"

        }
        else if (targetWord.includes(userWord[character])) {
            thisTile.background = "#b59f3b"
            thisTile.animation = "flip 0.4s"
            let kbTile = document.querySelector(`.${userWord[character].toLowerCase()}`)
            if (kbTile.style.background == "rgb(83, 141, 78)") {
                console.log("wont")
            }
            else {
                kbTile.style.background = "#b59f3b"
            }

        }
    }

    if (userWord === targetWord) {
        for (const i in userWord) {
            gameRow[currentRow].children[i].style.background = "#538d4e"
            gameRow[currentRow].children[i].style.animation = "flip 0.4s"
        }
        document.querySelector(".keyBoard").style.pointerEvents = "none"
        setTimeout(() => alert("You Win!!!"), 700)
    }

}