const { Category } = require("../../models");

module.exports = {
  getCategories: async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
  },

  getCategory: async (req, res) => {
    const { id } = req.params;
    const category = await Category.find({ _id: id })
      // .select("_id name status createdAt updateAt")
      .lean();
    res.json(category);
  },

  createCategory: async (req, res) => {
    try {
      const newCategoty = await new Category({
        name: "Travel",
        status: "ACTIVE",
        createdAt: new Date().getTime(),
        updateAt: new Date().getTime(),
      });

      newCategoty.save();
      res.json(newCategoty);
    } catch (err) {
      res.send("err>>>", err);
    }
  },

  updateCategory: () => { },
  deleteCategory: () => { },
};
