const express = require('express')
const router = express.Router()
const productController = require('../../controllers/productController')
const authMiddleware = require('../../middleware/auth')


router.get('getAllProducts',authMiddleware, productController.getAllProducts)

router.get('getProductById/:id',authMiddleware, productController.getProductById)

router.post('addProduct',authMiddleware, productController.addProduct)

router.put('updateProduct/:id',authMiddleware, productController.updateProduct)

router.delete('deleteProduct/:id', authMiddleware, productController.deleteProduct)

module.exports = router