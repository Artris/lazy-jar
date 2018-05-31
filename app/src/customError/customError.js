module.exports = class customError extends Error {
    constructor(errorMessage, errorCode) {
        super(errorMessage)
        Error.captureStackTrace(this, customError)
        this.code = errorCode
    }
}