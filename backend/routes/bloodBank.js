const express = require('express');
const { createBook,getBooks,getBook,deleteBook,updateBook,availableBook,unAvailableBook, unAvailableBookUser, getRentedBooks, upload } = require('../controllers/bookListController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router()

//require auth for all
router.use(requireAuth);

//get all workouts
router.get('/',getBooks);

router.get('/rentedBooks',getRentedBooks);

//get all workouts
router.get('/:id',getBook);

//post a workout
router.post('/',upload.single('image'),createBook)

// Approve a blood bank
router.patch('/approve/:id', availableBook);

// removeApprove a blood bank
router.patch('/rapprove/:id', unAvailableBook);

router.patch('/uapprove/:id', unAvailableBookUser);


//update workouts
router.patch('/:id',updateBook);

//delete a workout
router.delete('/:id',deleteBook);


module.exports = router