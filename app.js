const score = document.querySelector('.score')
const start = document.querySelector('.start')
const gameArea = document.querySelector('.gameArea')
const car = document.createElement('div')

car.classList.add('car')

start.addEventListener('click', startGame)
document.addEventListener('keydown', startRun)
document.addEventListener('keyup', stopRun)

const keys = {
   ArrowUp: false,
   ArrowDown: false,
   ArrowLeft: false,
   ArrowRight: false
}
const setting = {
   start: false,
   score: 0,
   speed: 3
}

function startGame() {
   start.classList.add('hide')
   setting.start = true
   gameArea.appendChild(car)
   setting.x = car.offsetLeft
   setting.y = car.offsetTop

   for (let i = 0; i < 20; i++) {
      const line = document.createElement('div')
      line.classList.add('line')
      line.style.top = (i * 100) + 'px'
      line.y = i * 100
      gameArea.appendChild(line)
   }

   requestAnimationFrame(playGame)
}

function playGame() {
   if (setting.start) {
      moveRoad()
      clientClick()

      car.style.left = `${setting.x}px`
      car.style.top = `${setting.y}px`

      requestAnimationFrame(playGame)
   }
}

function clientClick() {
   if (keys.ArrowLeft && setting.x > 0) setting.x -= setting.speed
   if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) setting.x += setting.speed
   if (keys.ArrowUp && setting.y > 0) setting.y -= setting.speed
   if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) setting.y += setting.speed
}

function startRun(event) {
   event.preventDefault()
   keys[event.key] = true
}

function stopRun(event) {
   event.preventDefault()
   keys[event.key] = false
}

function moveRoad() {
   let lines = document.querySelectorAll('.line')
   lines.forEach(function (item) {
      item.y += setting.speed
      item.style.top = `${item.y}px`

      if (item.y > document.documentElement.clientHeight) {
         item.y = -100
      }
   })
}