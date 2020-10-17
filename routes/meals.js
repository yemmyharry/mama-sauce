const express = require('express')
const router = express.Router()
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')
const { get_all_meals, create_meal, get_one_meal, update_meal, delete_meal } = require('../controllers/meals')

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './uploads/')
    },
    filename: function(req, file, callback){
        callback(null, file.originalname)
    }
})

const fileFilter = (req, file, callback) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        callback(null, true)
    }
    else {
        callback(null, false)
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

router.get('/', get_all_meals)

router.post('/', checkAuth, upload.single('mealImage'), create_meal)


router.get('/:mealId', get_one_meal)

router.put('/:mealId', checkAuth, update_meal)

router.delete('/:mealId', checkAuth, delete_meal)


module.exports = router;