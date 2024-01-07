// const mongoose=require('mongoose');

// const connection=mongoose.createConnection("mongodb://127.0.0.1:27017/incident",).on('open',()=>{
//     console.log("Mongodb connected");
// }).on('error',(error)=>{
//     console.error("Mongodb connection error",error);
// });
// module.exports=connection;



// // const mongoose = require('mongoose');
// // require('dotenv').config();


// // mongoose.connect('mongodb+srv://mishrakhushi1608:codewithkhushi@incident.7qw4awe.mongodb.net/?retryWrites=true&w=majority', {
// //   useNewUrlParser: true, // Add any other options you need here
// // }).then(() => {
// //   console.log('Mongodb connected');
// // }).catch((error) => {
// //   console.error('Mongodb connection error', error);
// // });





// //my main codde down
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true, // Add any other options you need here
}).then(() => {
  console.log('Mongodb connected');
}).catch((error) => {
  console.error('Mongodb connection error', error);
});