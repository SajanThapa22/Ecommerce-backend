function paginate(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    try {
      results.results = await model.find().skip(endIndex).limit(limit);
      res.paginatedResults = results;
      next();
    } catch ({ err }) {
      res.status(500).send({ message: err.message });
    }
  };
}

module.exports = paginate;
