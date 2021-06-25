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
   speed: 3,
   traffic: 2
}
function getQuantityElements(heightElement) {
   return document.documentElement.clientHeight / heightElement + 1
}

function startGame() {
   start.classList.add('hide')
   gameArea.innerHTML = ''
   for (let i = 0; i < getQuantityElements(100); i++) {
      const line = document.createElement('div')
      line.classList.add('line')
      line.style.top = (i * 100) + 'px'
      line.y = i * 100
      gameArea.appendChild(line)
   }
   for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
      const enemy = document.createElement('div')
      let randomCar = Math.round(Math.random() * 2)
      enemy.classList.add('enemy')
      enemy.y = -100 * setting.traffic * (i + 1)
      enemy.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50))}px`
      enemy.style.top = `${enemy.y}px`
      enemy.style.background = `transparent url(./image/enemy${randomCar}.png) center/cover no-repeat`
      gameArea.appendChild(enemy)
   }
   setting.score = 0
   setting.start = true
   gameArea.appendChild(car)
   car.style.left = `${gameArea.offsetWidth / 2 - car.offsetWidth / 2}px`
   car.style.top = 'auto'
   car.style.bottom = '10px'
   setting.x = car.offsetLeft
   setting.y = car.offsetTop

   requestAnimationFrame(playGame)
}

function playGame() {
   if (setting.start) {
      setting.score += setting.speed
      score.innerHTML = `SCORE: ${setting.score}`
      moveRoad()
      moveEnemy()
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

      if (item.y >= document.documentElement.clientHeight) {
         item.y = -100
      }
   })
}

function moveEnemy() {
   let enemy = document.querySelectorAll('.enemy')

   enemy.forEach(function (item) {
      let carRect = car.getBoundingClientRect()
      let enemyRect = item.getBoundingClientRect()

      if (carRect.top <= enemyRect.bottom &&
         carRect.right >= enemyRect.left &&
         carRect.left <= enemyRect.right &&
         carRect.bottom >= enemyRect.top) {

         setting.start = false
         start.classList.remove('hide')
         start.style.top = `${score.offsetHeight - 5}px`
      }

      item.y += setting.speed / 2
      item.style.top = `${item.y}px`

      if (item.y >= document.documentElement.clientHeight) {
         item.y = -100 * setting.traffic
         item.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50))}px`
      }
   })


}