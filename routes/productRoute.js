import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import {
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    prodcutCountController,
    productCategoryController,
    productFiltersController,
    productListController,
    productPhotoController,
    relatedProductController,
    searchProductController,
    updateProductController
} from '../controllers/productController.js'
import formidable from 'express-formidable'

const router = express.Router()


//create routes
router.post(
    '/create-product',
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);


//update routes
router.put(
    '/update-product/:pid',
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

//Get Products 
router.get('/get-product', getProductController)



//single product
router.get('/get-product/:slug', getSingleProductController)

//get photo

router.get('/product-photo/:pid', productPhotoController)

//delete product
router.delete("/delete-product/:pid", deleteProductController);


//filter product
router.post('/product-filters', productFiltersController)


//product count
router.get('/product-count', prodcutCountController)


//Product Per page
router.get('/product-list/:page', productListController)

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

export default router;