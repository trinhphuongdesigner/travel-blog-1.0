const { UserComment } = require("../../models");

module.exports = {
  getUserComment: async (req, res) => {
    try {
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      });
    }
  },
  getUserComments: () => {},
  createUserComment: () => {},
  updateUserComment: () => {},
  deleteUserComment: () => {},
};
