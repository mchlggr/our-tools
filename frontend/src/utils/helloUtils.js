const hellos = [
    "hello!",
    "hola!",
    "bonjour!",
    "guten tag!",
    "salve!",
    "nǐn hǎo!",
    "olá!",
    "asalaam alaikum!",
    "konnichiwa!",
    "anyoung haseyo!",
    "Zdravstvuyte!",
]

let index = 0
const end = hellos.length - 1

export const getHello = () => {
    const hello = hellos[index]
    index = index < end ? index + 1 : 0
    return hello
}

window._getHello = getHello