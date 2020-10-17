const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const { get_all_orders, create_new_order, get_single_order, delete_order } = require('../controllers/orders')

router.get('/', checkAuth, get_all_orders)

router.post('/', checkAuth, create_new_order)
    

router.get('/:orderId', checkAuth, get_single_order)

router.delete('/:orderId', checkAuth, delete_order)

module.exports = router;