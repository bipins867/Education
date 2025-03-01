
const Category = require("../../../../../Models/TestSeries/Category");
const Series = require("../../../../../Models/TestSeries/Series");

exports.getCategories = async (req, res) => {
  const { teacherId } = req.body;
  try {
    const categories = await Category.findAll({
      where: {
        isActive: true,
        UserId: teacherId,
      },
    });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getSeries = async (req, res) => {
  const { categoryId } = req.body;
  try {
    const series = await Series.findAll({
      where: {
        isActive: true,
        CategoryId: categoryId,
      },
    });
    res.status(200).json({ success: true, data: series });
  }
};
