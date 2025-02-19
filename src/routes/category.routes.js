const express = require('express');
const {
  createCategory,
  getCategoryTree,
  updateCategory,
  deleteCategory,
  changeCategoryStatus,
} = require('../controllers/category.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/', authMiddleware, createCategory);
router.get('/', authMiddleware, getCategoryTree);
router.put('/:id', authMiddleware, updateCategory);
router.patch('/:id', authMiddleware, changeCategoryStatus);
router.delete('/:id', authMiddleware, deleteCategory);

module.exports = router;
