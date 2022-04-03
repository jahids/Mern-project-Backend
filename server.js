const express = require("express");
const app = express();
const PORT = 5000;
const mongoose  = require('mongoose');
const cors = require("cors");
const cookiepaser = require('cookie-parser');
const authRoutes = require("./Routes/AuthRoutes")

// middelware
app.use(cors());
app.use(express.json());
app.use(cookiepaser())

//  database connect
// uri string i am using local database thats why not use username pass
mongoose.connect('mongodb://localhost/myapp')
.then(()=>console.log('database connect succesfully'))
.catch((err)=> console.log (err) )


app.get('/', () => {
    
    console.log('get runnig');
})

app.use('/', authRoutes)



app.listen(PORT, () => {
console.log(`server is runnig ${PORT}`);
})