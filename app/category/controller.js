const Category = require('./model')
const { setAlertAndRedirect, getAlertMessage } = require('../helpers/alert');


async function index(req, res) {
  try {
    const alert = getAlertMessage(req);

    const categories = await Category.find();
    if (req.headers.ajax) {
      res.render('admin/category/table', { categories, alert });
    } else {
      res.render('admin/category/view_category', {
        categories, alert, title: 'Category',
        name: req.session.user.name
      });
    }
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/category');
    throw error;
  }
}

function createCategory(req, res) {
  res.render('admin/category/create', {
    title: 'Category',
    name: req.session.user.name
  })
}

async function storeCategory(req, res) {
  try {
    const { name } = req.body;
    const category = await Category({ name });
    await category.save();

    setAlertAndRedirect({ req, res }, 'Berhasil tambah kategori', '/category', 'success');
    
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/category');
    throw error;
  }
}

async function editCategory(req, res) {
  const { id } = req.params;
  const category = await Category.findOne({ _id: id });
  res.render('admin/category/create', {
    category, title: 'Category',
    name: req.session.user.name
  });
}

async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate({
      _id: id
    }, { name });
    setAlertAndRedirect({ req, res }, 'Berhasil update kategori', '/category', 'success');
    
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/category');
    throw error;
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete({
      _id: id
    });
    setAlertAndRedirect({ req, res }, 'Berhasil hapus kategori', '/category', 'success');
    
  } catch (error) {
    setAlertAndRedirect({ req, res }, error.message, '/category');
    throw error;
  }
}

module.exports = {
  index,
  createCategory,
  storeCategory,
  editCategory,
  updateCategory,
  deleteCategory
}