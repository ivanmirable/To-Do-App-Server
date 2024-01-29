import express, { json } from 'express';
import mongoose  from 'mongoose';
import  {registerValidation,loginValidation, noteCreateValidation} from './validations.js';
import {checkAuth,handleValidationErrors} from "./utils/index.js";
import { UserController, NoteController } from "./controllers/index.js";
import multer from 'multer';
import cors from 'cors'



mongoose.connect('mongodb+srv://ivankrivonogov1823:pwVnHKalnznuHngV@cluster0.o9ova16.mongodb.net/notes?retryWrites=true&w=majority').then(()=>{
    console.log('db Ok')
  })
  .catch((err)=>console.log('DB error',err))
const app = express();

const storage = multer.diskStorage({
    destination:(_,__,cb)=>{
        cb(null,'uploads')
    },
    filename:(_,file,cb)=>{
        cb(null,file.originalname)
    },
})

const upload = multer({
    storage
})

app.use(express.json());// подключаем json
app.use(cors())
app.use('/uploads', express.static('uploads'))
// авторизация
app.post('/auth/login',loginValidation,handleValidationErrors,UserController.login)
//регистрация
app.post('/auth/register', registerValidation, handleValidationErrors,UserController.register)
// если функция checkAuth дойдет до next() то функция пойдет дальше
// поиск конкретного пользователя
app.get('/auth/me',checkAuth, UserController.getMe)

app.post('/upload',checkAuth,upload.single('image'),(req,res)=>{
    res.json({
        url:`/uploads/${req.file.originalname}`
    })
})
app.get('/notes', NoteController.getAll)
// могут только авторизованные пользователи
app.get('/notes/:id', NoteController.getOne)
app.post('/notes',noteCreateValidation,handleValidationErrors,NoteController.create)
app.delete('/notes/:id',checkAuth,NoteController.remove)
app.patch('/notes/:id',handleValidationErrors, NoteController.update)
app.get('/notesTag/:tag',NoteController.getBytag)
app.get('/tags',NoteController.getAllTags)
app.patch('/tags/:id',NoteController.addTagToNote)
app.get('/tags/:id',NoteController.getTagsByNote)
app.listen(4444, (err)=>{
    if (err) {
        return console.log(err);
    }
    console.log('Server Ok');
});
