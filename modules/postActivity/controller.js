const { PostActivity } = require('../../models');

module.exports = {
  getActivities: async (req, res) => {
    try {
      const {
        perPage, // lấy bao nhiêu kết quả?
        page, // lấy kết quả ở trang nào?
        searchField, // tìm kiếm ở trường nào?
        searchKey, // từ khóa tìm kiếm?
        sortName, // sắp xếp theo trường nào?
        order, // thứ tự sắp xếp?
      } = req.query;

      const defaultPerPage = Number(perPage) || 12;
      const defaultPage = Number(page) || 1;

      const sortObject = {};
      sortObject[sortName || 'timeStamp'] = order || 'asc';

      const findObject = {};
      findObject[searchField || 'activity'] = new RegExp(searchKey, 'i');

      const query = { ...findObject };

      const result = await PostActivity.find(query)
        .populate('postId', 'title')
        .populate('userId', 'firstName lastName')
        .skip((defaultPerPage * defaultPage) - defaultPerPage)
        .limit(defaultPerPage)
        .select('')
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

      PostActivity.countDocuments(query).exec((error, count) => {
        if (error) {
          return res.json(error);
        }
        return res.json({
          status: 200,
          message: 'Get Posts Success',
          payload: {
            total: count,
            totalPage: Math.ceil(count / defaultPerPage),
            currentPage: defaultPage,
            itemInPage: result.length,
            take: defaultPerPage,
            data: result,
          },
        });
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
