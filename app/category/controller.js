const Category = require('./model')
async function index(req, res) {
  const categories = await Category.find();

  res.render('admin/category/view_category', {categories});
}

function createCategory(req, res) {
  // const { id } = req.body;
  res.render('admin/category/create')
}

async function storeCategory(req, res) {
  try {
    const { name } = req.body;
    const category = await Category({ name });
    await category.save();

    res.redirect('/category');
  } catch (error) {
    throw error;
  }
}

module.exports = {
  index,
  createCategory,
  storeCategory
}