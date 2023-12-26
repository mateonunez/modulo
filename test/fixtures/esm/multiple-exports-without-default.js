export async function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default function greet (name) {
  return `Hello, ${name}!`
}
