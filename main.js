import { Automata } from './automata.js'

const canvas = document.querySelector('canvas')
const start = document.querySelector('#start')
const stop = document.querySelector('#stop')
const random = document.querySelector('#random')
const reset = document.querySelector('#reset')

const ctx = canvas.getContext('2d')
ctx.canvas.width = 750
ctx.canvas.height = 390

const automata = new Automata(ctx, 50, 26)

let interval;

function handleStart() {
  if(interval) clearInterval(interval)
  interval = setInterval(() => {
    automata.updateMatrix()
  }, 100)
}

function handleStop() {
  if(interval) clearInterval(interval)
}

function handleRandom(){
  if(interval) clearInterval(interval)
  automata.createRandomMatrix()
}
const handleReset = () => automata.reset()

canvas.addEventListener('click', e => {
  const { offsetX, offsetY } = e
  const x = Math.floor(offsetX / 15)
  const y = Math.floor(offsetY / 15)
  if(x >= 0 && y >= 0 && x < 100 && y < 100)
    automata.printCell(x, y)
})

start.addEventListener('click', handleStart)
stop.addEventListener('click', handleStop)
random.addEventListener('click', handleRandom)
reset.addEventListener('click', handleReset)