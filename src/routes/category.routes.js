const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategoryTree,
  updateCategory,
  deleteCategory,
  changeCategoryStatus,
} = require('../controllers/category.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { createCategorySchema, updateCategorySchema } = require('../validators');
const validateRequest = require('../middleware/validateMiddleware');

router.post('/', validateRequest(createCategorySchema), authMiddleware, createCategory);
router.get('/', validateRequest(updateCategorySchema), authMiddleware, getCategoryTree);
router.put('/:id', authMiddleware, updateCategory);
router.patch('/:id', authMiddleware, changeCategoryStatus);
router.delete('/:id', authMiddleware, deleteCategory);

module.exports = router;
