import  NoteModel from "../models/Note.js";

export const getAll = async(req,res)=>{
try {
    const notes = await NoteModel.find().populate('user').exec();
    res.json(notes)
} catch (err) {
    console.log(err);
        res.status(500).json({
            message:"Не удалось получить заметки",
        }) 
}
}
export const getAllTags= async(req,res)=>{
  try {
    const tags = await NoteModel.distinct('tags');
    res.json(tags)
  } catch (err) {
    res.status(500).json({
      message:"Не удалось получить Теги",
  }) 
  }
}
export const addTagToNote = async (req,res)=>{
  const noteId = req.params.id
  const {tag} = req.body

  try {
     await NoteModel.findByIdAndUpdate(
      noteId,
      {$addToSet:{tags:tag}},
      {new:true}
    )
    res.json({
      success:true
    })
  } catch (err) {
    res.status(500).json({
      message:"Не удалось получить заметки",
  }) 
  }
}
export const getTagsByNote = async (req,res)=>{
  const noteId = req.params.id
  try {
    const note = await NoteModel.findById(noteId);
    if (!note) {
      return res.status(404).json({
        message: 'Заметка не найдена',
      });
    }
    res.json(note.tags || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Не удалось получить теги для заметки',
    });
  }

}

export const getBytag = async (req,res)=>{
  const tag = req.params.tag;
  try {
    let query = {};
    if (tag) {
      query = { tags: tag };
    }
    const notes = await NoteModel.find(query).populate('user').exec();
    res.json(notes)
  } catch (err) {
    console.log(err);
    res.status(500).json({
        message:"Не удалось получить заметки",
    }) 
  }
}
export const getOne = (req, res) => {
    const noteId = req.params.id;
  
    NoteModel.findById(noteId)
      .then((doc) => {
        if (!doc) {
          return res.status(404).json({
            message: 'Заметка не найдена',
          });
        }
        res.json(doc);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          message: 'Не удалось получить заметку',
        });
      });
  };

export const create = async (req,res)=>{
    try {   
        const doc = new NoteModel({
            tittle: req.body.tittle,
            description:req.body.description,
            completed:req.body.completed,
            user:req.userId,  
        })
        const note = await doc.save()
        res.json(note)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:"Не удалось cоздать заметку",
        }) 
    }
}

export const remove = (req, res) => {
  const postId = req.params.id;

  NoteModel.findOneAndDelete({ _id: postId })
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: 'Заметка не найдена',
        });
      }

      res.json({
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось удалить заметку',
      });
    });
};
export const update = (req, res) => {
  const postId = req.params.id;

  NoteModel.updateOne({ _id: postId },{
    tittle: req.body.tittle,
    description:req.body.description,
    completed:req.body.completed,
    tags:req.body.tags,

  })
    .then((result) => {
      res.json({
        success: true,
      });
      }
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: 'Не удалось обновить заметку',
      });
    });
}; 