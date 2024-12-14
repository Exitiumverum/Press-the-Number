'use strict'

let matrix = []
let gSize = 4
let gCellCount = gSize * gSize
let nums = []
let gClonedNums = []
let nextNumber
let gTimer
let gStartTime
let gIsTimerRunning = false
let maxRecord = 0

gameStart()


function gameStart() {
    gameInit()

    if (gIsTimerRunning) stopTimer()
    startTimer()
}

function gameInit() {
    createSquareMat(gSize)

    renderTable(matrix)

    createTableArrays(gSize)

    renderNextNumber()
}

function createTableArrays(size) {
    nums = []
    for (let i = 0; i <= (size * size) - 1; i++) {
        nums[i] = i + 1
    }
    gClonedNums = nums.slice()
    // console.log(nums)
}
function renderNextNumber() {
    const randomIndex = Math.floor(Math.random() * nums.length)
    let nextNum = document.querySelector('.next-num')

    nextNum.innerText = `Next Number: ${nums[randomIndex]}`
    nextNumber = nums[randomIndex]
    nums.splice(randomIndex, 1)
}

function createSquareMat(size = 3) {
    matrix = []
    let count = 1

    for (let i = 0; i < size; i++) {
        matrix[i] = []
        for (let j = 0; j < size; j++) {
            matrix[i][j] = count++
        }
    }
    // console.table(matrix)
    return matrix
}

function renderTable(matrix) {
    let tbody = document.getElementById('matrix-tbody')
    let tableCode = ''
    let count = 1

    for (let i = 0; i < gSize; i++) {
        tableCode += `<tr>`
        for (let j = 0; j < gSize; j++) {
            tableCode += `<td id ="i" class ="board-nums" onclick="checkCorrectNum(this)">${count++}</td>`
        }
        tableCode += `</td>`
    }
    // console.log(tableCode)
    tbody.innerHTML = tableCode
}

function checkCorrectNum(elNum) {
    let pressedNum = +elNum.innerText


    if (pressedNum === nextNumber) {
        // console.log('success')
        gClonedNums.splice(i, 1)
        if (gClonedNums.length === 0) {
            gameOver()
        } else renderNextNumber()
    }

}

function newGameBtn(elBtn) {
    gameStart()
}

function startTimer() {
    gStartTime = Date.now()
    gIsTimerRunning = true
    gTimer = setInterval(() => {
        const elapsedTime = Date.now() - gStartTime
        const seconds = Math.floor((elapsedTime / 1000) % 60)
        const miliseconds = Math.floor((elapsedTime / (100)) % 60)

        document.querySelector('.timer').innerText =
            `${seconds.toString().padStart(2, '0')}:${miliseconds.toString().padStart(2, '0')}`
    }, 100)
}

function stopTimer() {
    clearInterval(gTimer)
    gIsTimerRunning = false
}

function difficulityBtn(elBtn) {
    let btnValue = Math.sqrt(+elBtn.innerText)
    console.log(btnValue)

    if (btnValue > gSize || btnValue < gSize) {
        gSize = btnValue
        gameStart()
    }
}

function gameOver() {
    let nextNum = document.querySelector('.next-num')
    let time = document.querySelector('.timer').innerText
    let gameTime = Date.now() - gStartTime
    
    console.log(time)

    nextNum.innerText = 'game Over!!'
    if(gameTime > maxRecord){
        maxRecord = gameTime
        confirm('congratulations!! new record: ' + time)
    }

    stopTimer()

}