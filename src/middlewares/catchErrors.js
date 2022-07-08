const {InappropriateActionError, Forbidden, Unauthorized} = require('../errors');

const catchErrors = (err, req, res, next) => {

    if (err instanceof InappropriateActionError) {
        res.status(400).json({error: err.message, cause: err.cause});
        res.end();
    } else if (err instanceof Unauthorized) {
        res.status(401).json({error: err.message, cause: err.cause});
        res.end();
    } else if (err instanceof Forbidden) {
        res.status(403).json({error: err.message, cause: err.cause});
        res.end();
    } else {
        res.status(500).json({error: 'Server Error'});
        res.end();
    }
};

module.exports = catchErrors;