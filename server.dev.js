const express = require('express')

const __dist = './docs/.vuepress/dist'

const port = 8080

const app = express()

app.use(express.static(__dist))

app.listen(port, () => {
    console.log(`Dev service on http://localhost:${port}`)
})
