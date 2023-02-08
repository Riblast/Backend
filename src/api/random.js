const countRandoms = cant => {
    const randoms = {}
    for (let i = 0; i < cant; i++) {
        const random = Math.floor(Math.random() * 1000) + 1
        randoms[random] = randoms[random] ? randoms[random] + 1 : 1
    }
    return randoms
}

process.on('message', cant => {
    const randoms = countRandoms(cant)
    process.send(randoms)
})