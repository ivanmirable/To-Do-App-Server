import  mongoose from 'mongoose';
const NoteSchema = new mongoose.Schema({
    tittle:{
        type: String,
        required:true,
    },
    description:{
        type: String,
        required:true,
    },
    completed:{
        type:Boolean,
        required:true,
    },
    tags:{
        type:Array,
        default:['All'],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true,
    }
},
{
    timestamps:true,
},
)
export default mongoose.model('Note',NoteSchema)