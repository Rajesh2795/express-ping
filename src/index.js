const express = require('express')
const app = express()

const routes = require('./routes'); //

app.use(routes)

/*
 This is a middleware function to handle errors.
 Sends the client error message.
 */
app.use(function (err, req, res, next) {
    res.send(err.message)
})

const port = 3000 || process.env.PORT

app.listen(port, () => {
    console.log('Server is running.')
})

