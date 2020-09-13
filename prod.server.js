const express = require('express')

const __dist = '../dist'

const port = 9002

const app = express()

app.use(express.static(__dist))

app.listen(port, () => {
    console.log(`Dev service on http://localhost:${port}`)
})
