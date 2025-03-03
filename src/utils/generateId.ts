const generateId = (): number => {
    return new Date().getTime()
}

export { generateId }