const { PostActivity } = require("../../models");

module.exports = {
  getActivities: async (req, res) => {
    try {
      const postActivities = await PostActivity.find().select().lean();
      if (!postActivities) {
        res.json({
          status: 404,
          message: "Not found",
          payload: null,
        });
        return;
      }
      res.json({
        status: 200,
        message: "Get Post Activities Success",
        payload: postActivities,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Internal Server Error",
        payload: err,
      });
    }
  },
};
