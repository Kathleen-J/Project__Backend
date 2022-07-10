module.exports = {
    catcher: (controller) => (req, res, next) => controller(req, res, next).catch(next)
  };