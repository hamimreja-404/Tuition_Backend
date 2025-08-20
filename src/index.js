import dotenv from 'dotenv';
import connectDB from './db/dataBase.js';
import app from './app.js';

dotenv.config();

connectDB().then(()=>{
    console.log(process.env.PORT);
    app.listen(process.env.PORT || 4000, ()=>{
        console.log(`Server is running on port: ${process.env.PORT || 4000}`);
    })
}).catch((error)=>{
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
})
