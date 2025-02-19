const categoryModel = require('../models/category.model');
const Category = require('../models/category.model');
const Type = require('mongoose').Types;

exports.createCategory = async (req, res) => {
  try {
    const { name, parent, status } = req.body;
    const category = new Category({ name, parent, status });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryTree = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    const buildTree = (parentId = null) => {
      return categories
        .filter(category => String(category.parent) === String(parentId))
        .map(category => ({
          ...category,
          children: buildTree(category._id),
        }));
    };
    res.json(buildTree());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const findCategory = await Category.findById(id);
    if (!findCategory) return res.status(404).json({ message: 'Category not found' });
    const { name } = req.body;
     await Category.findByIdAndUpdate(id, { name});
     const category = await Category.findById(id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.changeCategoryStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;
  
      const findCategory = await Category.findById(id);
      if (!findCategory) return res.status(404).json({ message: 'Category not found' });

      if(status === 'active') {
        await categoryModel.updateOne({_id: id}, {status: 'active'});
        return res.json({ message: "Category marked as active" });
      }
        
        const result = await Category.aggregate([
            {
              $match: { _id: new Type.ObjectId(id) },
            },
            {
              $graphLookup: {
                from: "categories",
                startWith: "$_id",
                connectFromField: "_id",
                connectToField: "parent",
                as: "descendants",
              },
            },
          ]);
      const allCategoriesToUpdate = [id, ...result[0].descendants.map(d => d._id)];
  
      await Category.updateMany(
        { _id: { $in: allCategoriesToUpdate } },
        { $set: { status: 'inactive' } }
      );
  
      res.json({ message: "Category and all its subcategories marked as inactive" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await Category.updateMany({ parent: id }, { parent: category.parent });
    await Category.findByIdAndDelete(id);
    res.status(204).json({
        "message": "Category deleted successfully"
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
