import  mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    passwordHash:{
        type:String,
        required:true,
    },
    avatarUrl:String, // Если мы хотим укзаать чтол свойства будет не обязательнмБ то не ставиим скобки обьекта 

},
{
    timestamps:true,
},
)
export default mongoose.model('User',UserSchema)