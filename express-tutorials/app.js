//creating a single file express app
//this app starts a server & listens on port 3000 for connections & responds with 'Hello World' for requests to the root URL(/) or route
//For every other path, it will respond with a 404 Nof Found
const express = require('express')
const app = express()

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
//The req (request) and res (response) are the exact same objects that Node provides, so you can invoke req.pipe(), req.on('data', callback), and anything else you would do without Express involved.
export default app