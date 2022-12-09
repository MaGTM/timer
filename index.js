function timer(startBtnSelector, buttonsContainerSelector, circleSelector, minutesSelector, secondsSelector) {
    const circle = document.querySelector(circleSelector)
    const minutes = document.querySelector(minutesSelector)
    const seconds = document.querySelector(secondsSelector)
    const start = document.querySelector(startBtnSelector)
    const buttonsContainer = document.querySelector(buttonsContainerSelector)

    const RADIUS = circle.getAttribute('r')
    const PERIMETR = 2 * Math.PI * RADIUS
    const MINUTE = 60

    let time = (Number(minutes.value) * 60) + Number(seconds.value)

    const changingValue = PERIMETR / time

    start.style.display = 'none'

    let timerView = (remainingTime, minutes, seconds) => {
        if(remainingTime > MINUTE) {
            minutes.value = Math.floor(remainingTime / MINUTE)
            remainingTime -= Math.floor(remainingTime / MINUTE) * MINUTE
            
        }
        if(MINUTE > remainingTime) {
            seconds.value = remainingTime
        }
    }

    let timerRefactor = (minutes, seconds) => {
        if(Number(minutes.value) < 10) {
            minutes.value = '0' + minutes.value
        }
        if(Number(seconds.value) < 10) {
            seconds.value = '0' + seconds.value
        }
    }

    let isPaused = false

    let clockHandler = () => {
        if(!isPaused) {
            circle.style.strokeDashoffset -= changingValue
        time -= 1
        timerView(time, minutes, seconds)
        timerRefactor(minutes, seconds)
        if(!time) {
            clearInterval(clock)
            return 'Отсчет окончен'
        }
        }
    }
    clockHandler()
    let clock = setInterval(clockHandler, 1000)

    let pauseBtn = document.createElement('button'),
        stopBtn = document.createElement('button')

    pauseBtn.textContent = 'Pause'
    stopBtn.textContent = 'Stop'
    pauseBtn.style.marginRight = '20px'
    buttonsContainer.appendChild(pauseBtn)
    buttonsContainer.appendChild(stopBtn)

    let pauseHandler = () => {
        isPaused = true
        pauseBtn.textContent = 'Start'
        if(pauseBtn.getAttribute('data-paused') === 'true') {
            isPaused = false
            pauseBtn.setAttribute('data-paused', 'false')
            pauseBtn.textContent = 'Pause'
            return
        }
        pauseBtn.setAttribute('data-paused', 'true')
    }

    let stopHandler = () => {
        clearInterval(clock)
        minutes.value = '00'
        seconds.value = 30
        start.style.display = 'block'
        circle.style.strokeDashoffset = 0
        pauseBtn.remove()
        stopBtn.remove()
        pauseBtn.removeEventListener('click', pauseHandler)
        stopBtn.removeEventListener('click', stopHandler)
    }

    pauseBtn.addEventListener('click', pauseHandler)

    stopBtn.addEventListener('click', stopHandler)
}

document.querySelector('button').addEventListener('click', () => {
    timer('button', '.buttons', 'svg > circle', '#minutes', '#seconds')
})