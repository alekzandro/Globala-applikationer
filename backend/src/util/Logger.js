class Logger {
    // Logs error to console
    logError (err){
        const errName = err.name || 'Undefined name'
        const errMsg = err.message || 'Undefined msg'
        console.log(`Error: ${errName} \nMessage: ${errMsg}`)
    }
}

module.exports = {Logger}