import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';



const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.json({ limit: "60mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "60mb", extended: true }))
app.use(cors());


app.use('/books',bookRoutes);
app.use('/auth',userRoutes);

app.get('/', (req,res)=>{
    res.send('Hello To Library API');
});




const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT,() => console.log(`server is running on port:http://localhost:${PORT}`)))
.catch((err) => console.log(err));





