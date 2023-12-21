const express = require('express')
const router = express.Router()
const productController = require('../../controllers/productController')
const authMiddleware = require('../../middleware/auth')


router.get('products/getAllProducts',authMiddleware, productController.getAllProducts)

router.get('products/getProductById/:id',authMiddleware, productController.getProductById)

router.post('products/addProduct',authMiddleware, productController.addProduct)

router.put('products/updateProduct/:id',authMiddleware, productController.updateProduct)

router.delete('products/deleteProduct/:id', authMiddleware, productController.deleteProduct)

module.exports = router