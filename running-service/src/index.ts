import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes'
import path from 'path'

dotenv.config()

const port = process.env.PORT || 4005
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/temp', express.static(path.join(__dirname, '/../', 'temp')))

app.use('/api', router)

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
