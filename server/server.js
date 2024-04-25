import fs from 'fs'
import { nanoid } from 'nanoid'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const filePath = 'data.json'

app.get('/', (req, res) => {
  res.send('hello world')
})

app.post('/user', (req, res) => {
  // wenn 'data.json' nicht existiert, wird sie erstellt
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]')
  }

  const userInfo = req.body
  const newData = { id: nanoid(), ...userInfo }

  let data = fs.readFileSync(filePath, 'utf-8')
  let jsonData = JSON.parse(data)

  jsonData.push(newData)

  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2))
  res.send('User added successfully')
})

app.listen(3002, () => console.log('server is running on port 3002'))
