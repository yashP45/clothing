module.exports = fn => {
    return (re, res, next) => {
        fn(re, res, next).catch(next)
    }
}
