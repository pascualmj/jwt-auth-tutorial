const app = require('./app')

// Set port number
app.set('port', process.env.PORT || 1234)

// Run API server
app.listen(app.get('port'), () => {
    console.log(`Server >> Ready on port ${app.get('port')}.`)
})