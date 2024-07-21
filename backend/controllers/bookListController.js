const BookList = require('../models/bookListModel')
const mongoose = require('mongoose');


const multer = require('multer');


// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

//get all workout
const getBooks = async (req, res) =>{ 
    // const user_id = req.user._id
    const workouts = await BookList.find().sort({createdAt: -1})
    res.status(200).json(workouts)
}

// Get a single book
const getBook = async (req, res) => {
    const { id } = req.params;
    const book = await BookList.findById(id);
    console.log(book,"book")
    if (!book) {
      return res.status(404).json({ error: 'Not Found' });
    }
    res.status(200).json(book);
  };

//post a workout

const createBook = async (req, res) =>{
const {serialNo,title,author,publicationYear,genre,desc,isbn} = req.body;
const image = req.file ? req.file.path : null;
let user_id = req.user._id;
let currentUser = "admin";
const isAvailable = !user_id;
// If user_id is not present, set it to admin

console.log(serialNo,title,author,publicationYear,genre,desc,isbn,isAvailable,currentUser,image);


try {
    

    const workout = await BookList.create({serialNo,title,author,publicationYear,genre,desc,isbn,isAvailable,currentUser,image});
 
    
        res.status(200).json(workout)
    }catch(error){
        console.log(error)
        res.status(400).json(error)
    }
}

//update a workout
const updateBook = async (req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout= await BookList.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!workout){
        return res.status(400).json({error: 'Not Found'})
    }

    res.status(200).json(workout)

}



//delete a workout
const deleteBook = async (req, res) =>{
const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await BookList.findOneAndDelete({ _id: id})

    if(!workout){
        return res.status(400).json({error: 'Not Found'})
    }

    res.status(200).json(workout)
}

//approve
const availableBook = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    try {
        const updatedBloodBank = await BookList.findByIdAndUpdate(
            id,
            { isAvailable: true, currentUser: null },
            { new: true }
        );

        if (!updatedBloodBank) {
            return res.status(400).json({ error: 'Not Found' });
        }

        res.status(200).json(updatedBloodBank);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const unAvailableBook = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    try {
        const updatedBloodBank = await BookList.findByIdAndUpdate(
            id,
            { isAvailable: false, currentUser:  null },
            { new: false }
        );

        if (!updatedBloodBank) {
            return res.status(400).json({ error: 'Not Found' });
        }

        res.status(200).json(updatedBloodBank);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const unAvailableBookUser = async (req, res) => {
    const { id } = req.params;
    console.log(req.user._id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    try {
        const updatedBloodBank = await BookList.findByIdAndUpdate(
            id,
            { isAvailable: false, currentUser:  req.user._id },
            { new: false }
        );

        if (!updatedBloodBank) {
            return res.status(400).json({ error: 'Not Found' });
        }

        res.status(200).json(updatedBloodBank);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get books rented by the user
const getRentedBooks = async (req, res) => {
    try {
      const userId = req.user._id; // Assuming req.user contains the authenticated user's data
      const books = await BookList.find({ currentUser: userId });
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


module.exports = {getBook,createBook,getBooks,deleteBook,updateBook,availableBook,unAvailableBook,unAvailableBookUser,getRentedBooks, upload}