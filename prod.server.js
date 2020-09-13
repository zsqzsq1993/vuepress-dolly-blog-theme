const express = require('express')

const https = require('https')
const fs = require('fs')
const credential = {
    key: fs.readFileSync('/etc/nginx/2_dollylosingweight.today.key'),
    cert: fs.readFileSync('/etc/nginx/1_dollylosingweight.today_bundle.crt')
}

const __dist = '../dist'

const port = 9002

const app = express()

app.use(express.static(__dist))

const httpsServer = https.createServer(credential, app)

httpsServer.listen(port, () => {
    console.log(`Dev service on https://localhost:${port}`)
})
