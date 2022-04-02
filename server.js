const express = require("express");
const app = express();
const PORT = 6000;
const mongoose  = require('mongoose');
const cors = require("cors");

// middelware
app.use(cors());
app.use(express.json());

//  database connect
// uri string i am using local database thats why not use username pass
mongoose.connect('mongodb://localhost/myapp')
.then(()=>console.log('database connect succesfully'))
.catch((err)=> console.log (err) )


app.get('/', () => {
    
    console.log('get runnig');
})



app.listen(PORT, () => {
console.log(`server is runnig ${PORT}`);
})