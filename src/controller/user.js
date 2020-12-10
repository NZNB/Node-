const login = (username, password) => {
    if (username === 'ningzheng' && password === '123') {
        return true
    }
    return false
}

module.exports = {
    login
}