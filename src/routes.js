const express = require('express')
const router = express.Router()

/*
 Middleware function acts specifically on /greetings/:name route.
 This function checks if the name is valid or not.
 if name is valid then it forwards to the next route.
 Otherwise it forwards to the error middleware function.
 */
router.use('/greetings/:name', function (req, res, next) {
    const name = req.params.name.trim() // remove the spaces at front and last.
    if (!isParamsValid(name)) { // check if the name is valid or not.
        const error = new Error('Invalid params')
        next(error) // forward to error middleware function
    } else {
        next() // forward to next route
    }
})

/*
 This function checks if the name has length less than 50 characters.
 It checks for any special characters other than alphabets using regex expression.
 It allows spaces to be present in between words or characters.
 if yes then sends boolean value false.
 It sends false value when string has null, undefined, or value.
 */
const isParamsValid = function (name) {
    // check if length is appropriate
    if (name.length > 50) {
        return false
    }

    let nameLowerCase = name.toLowerCase()

    //Regex to check for only alphabets and spaces between words or characters.
    let regExp = /^[a-z]+([\s][a-z]+)*$/
    if (!nameLowerCase.match(regExp)) {
        return false;
    } else return !(nameLowerCase === 'undefined' || nameLowerCase === 'null' || nameLowerCase === 'or');
}

/*
 This route replies the client with hello and their name.
 */
router.get('/greetings/:name', (req, res) => {
    const name = req.params.name
    res.send(`"Hello, ${name}!"`)
})

/*
 This route handles any invalid urls.
 Sends client a response.
 */
router.get('*', (req, res) => {
    res.send('Not a valid url')
})

module.exports = router;