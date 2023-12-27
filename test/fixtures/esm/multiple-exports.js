export default function greet (name) {
  return `Hello, ${name}!`
}

export async function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const pi = 3.14159
export function square (number) {
  return number * number
}

export const greeting = 'Hello World'

export const hello = {
  world: 'Hello World'
}
