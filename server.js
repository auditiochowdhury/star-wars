const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

// ========================
// Link to Database
// ========================
// Updates environment variables

// require('./dotenv')

// Replace process.env.DB_URL with your actual connection string
const connectionString = 'mongodb+srv://auditio:auditio11219@cluster0.wkms4wp.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    // ========================
    // Middlewares
    // ========================
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))

    // ========================
    // Routes
    // ========================
    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(quotes => {
          res.render('index.ejs', { quotes: quotes })
        })
        .catch(/* ... */)
    })

    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.put('/quotes', (req, res) => {
      quotesCollection.findOneAndUpdate(
        { name: 'Yoda' },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        {
          upsert: true
        }
      )
        .then(result => res.json('Success'))
        .catch(error => console.error(error))
    })

    app.delete('/quotes', (req, res) => {
      quotesCollection.deleteOne(
        { name: req.body.name }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json('Deleted Darth Vadar\'s quote')
        })
        .catch(error => console.error(error))
    })

    // ========================
    // Listen
    // ========================
    const isProduction = process.env.NODE_ENV === 'production'
    const port = isProduction ? 7500 : 3000
    app.listen(port, function () {
      console.log(`listening on ${port}`)
    })
  })
  .catch(console.error)


















// //Making sure node is working
// console.log('May Node be with you')
// // use express by requiring it
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser')
// // Installed mongodb and connecting to it using mongoclient method
// const MongoClient = require('mongodb').MongoClient;
// const res = require('express/lib/response');
// MongoClient.connect('mongodb+srv://auditio:auditio11219@cluster0.wkms4wp.mongodb.net/?retryWrites=true&w=majority', {
//     useUnifiedTopology:true })
//     .then(client => {
//         console.log('Connected to database')
//         const db = client.db('star-wars-quotes') //Changed the name of the database from test 
//         const quotesCollection = db.collection('quotes') // create a collection to store our quotes in
//         // Installed a package manager called body parser, this method goes before the crud handlers
// // urlencoded extracts data from form and adds them to body property in the request object
// //also had to move all the express request handlers ex. app.get, into MongoClient, and then call, to get access to the db variable
//         app.set('view engine','ejs')
//         //tells express we are using ejs as a template engine for rendering html
        
//         // Tell our server to accept JSON
//         app.use(bodyParser.json())

//         // time to handle the PUT requests
//         app.put('/quotes',(req,res)=>{
//             quotesCollection.findOneAndUpdate(
//                 { name:'Yoda' },
//                 {
//                     $set: {
//                         name:req.body.name,
//                         quote:req.body.quote
//                     }
//                 },
//                 {
//                     upsert:true
//                 }
//             )
//               .then(result=> {
//                   res.json('Success')
//               }) 
//               .catch(error=>console.error(error))
//         })

//         // telling express to make the public folder accessible to the public. This is for our put requests
//         app.use(express.static('public'))

//         app.use(bodyParser.urlencoded({extended:true}))
//         //This makes a server using express
//         app.listen(3000, function(){
//             console.log('listening on 3000')
//         })
//         // ^^Should now be able to communicate to our express server through browser when we open localhost:3000(cannot get will show up)

//         //
//         app.get('/',function (req, res){
//             // res.sendFile(__dirname + '/index.html')
//             // dirname is current directory ^
//             db.collection('quotes').find().toArray()
//               .then(results =>{
//                 res.render('index.ejs', { quotes: results })
//                   console.log(results)
//               })
//               .catch(error => console.error(error))
            
//         })

//         //This handles the POST requests for the Quotes section we made in html, also decided to try some arrow function
//         app.post('/quotes', (req, res)=>{
//             quotesCollection.insertOne(req.body)
//             .then(result=>{
//                 res.redirect('/')
//             })
//             .catch(error => console.error(error))
// })
        
//     })


 




