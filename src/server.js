const express = require('express')
const cors = require('cors')
const routes = require('./routes')


require('./database')

const app = express()

app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server running in ${process.env.DB_HOST}`)
})