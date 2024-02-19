import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 4005
const app = express()
app.use(cors())

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
