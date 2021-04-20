const { Post, PostActivity } = require('../../models');

const updatePostActivities = async (userId, postId, activity) => {
  const newPostActivity = new PostActivity({
    userId,
    activity,
    timeStamp: new Date().getTime(),
    postId,
  });
  newPostActivity.save();
};

module.exports = {
  getPosts: async (req, res) => {
    try {
      const {
        perPage, // lấy bao nhiêu kết quả?
        page, // lấy kết quả ở trang nào?
        searchField, // tìm kiếm ở trường nào?
        searchKey, // từ khóa tìm kiếm?
        sortName, // sắp xếp theo trường nào?
        order, // thứ tự sắp xếp?
      } = req.query;
      const defaultPerPage = Number(perPage) || 12; // số lượng sản phẩm xuất hiện trên 1 page
      const defaultPage = Number(page) || 1;

      const sortObject = {};
      sortObject[sortName || 'title'] = order || 'asc'; // khởi tạo giá trị mặc định cho đối tượng sắp xếp dữ liệu

      const findObject = {};
      findObject[searchField || 'title'] = new RegExp(searchKey, 'i'); // khởi tạo giá trị mặc định cho đối tượng tìm kiếm dữ liệu

      const result = await Post.find(findObject)
        .skip((defaultPerPage * defaultPage) - defaultPerPage)
        .limit(defaultPerPage)
        .select('title')
        .sort(sortObject)
        .lean();
      if (!result) {
        res.json({
          status: 404,
          message: 'Not found',
          payload: null,
        });
        return;
      }

      res.json({
        status: 200,
        message: 'Get Posts Success',
        payload: result,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: 'Internal Server Error',
        payload: err,
      });
    }
  },

  getPost: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Post.findOne({ _id: id }).lean();
      if (!result) {
        res.json({
          status: 404,
          message: 'Not found',
          payload: null,
        });
        return;
      }
      res.json({
        status: 200,
        message: 'Get Post Success',
        payload: result,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: 'Internal Server Error',
        payload: err,
      });
    }
  },

  createPost: async (req, res) => {
    try {
      const newPost = new Post({
        ...req.body,
      });
      const result = await newPost.save();
      const { userId } = req.body;
      // eslint-disable-next-line no-underscore-dangle
      const postId = result._id;
      updatePostActivities(userId, postId, 'CREATE');
      res.json({
        status: 200,
        message: 'Create Post Success',
        payload: result,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: 'Internal Server Error',
        payload: err,
      });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Post.updateOne(
        { _id: id },
        {
          $set: {
            ...req.body,
          },
        },
      );
      updatePostActivities(req.body.userId, id, 'UPDATE');
      res.json({
        status: 200,
        message: 'Update Post Success',
        payload: result,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: 'Internal Server Error',
        payload: err,
      });
    }
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Post.remove({ _id: id });
      updatePostActivities(req.body.userId, id, 'DELETE');

      res.json({
        status: 200,
        message: 'Delete Post Success',
        payload: result,
      });
    } catch (err) {
      res.json({
        status: 500,
        message: 'Internal Server Error',
        payload: err,
      });
    }
  },
};
