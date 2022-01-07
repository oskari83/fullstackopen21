const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as an argument')
  process.exit(1)
}

const password = process.argv[2]
const databaseName = "phoneBook"

const url =
 `mongodb://fullstack:${password}@cluster0-shard-00-00.ro7dw.mongodb.net:27017,cluster0-shard-00-01.ro7dw.mongodb.net:27017,cluster0-shard-00-02.ro7dw.mongodb.net:27017/${databaseName}?ssl=true&replicaSet=atlas-m7i3ac-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const phoneBookSchema = new mongoose.Schema({
  name: String,
  phoneNum: String
})

const PhoneN = mongoose.model('PhoneNumber', phoneBookSchema)

if (process.argv.length<4) {
    console.log("phonebook:")
    PhoneN.find({}).then(result => {
        result.forEach(num => {
          console.log(num.name,num.phoneNum)
        })
        mongoose.connection.close()
    })
}else{
    const name = process.argv[3]
    const phoneNumber = process.argv[4]

    const phoneN = new PhoneN({
        name: name,
        phoneNum: phoneNumber
    })

    phoneN.save().then(result => {
        console.log(`Added ${name} number ${phoneNumber} to phonebook`)
        mongoose.connection.close()
    })
}