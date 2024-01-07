const app = require('./app');
const mongoose = require('mongoose');

const port = 3000; // Use process.env.PORT for production or fallback to 3000 for development




app.get('/',(req,res)=>{
  res.send("Helloe world")
});
app.get('*', (req, res) => {
  res.status(404).send('Not nahi Found');
});

app.listen(port,'0.0.0.0',()=>{
  console.log(`SErver lsitening on Port http://localhost:${port}`);
})
