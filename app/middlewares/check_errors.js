const checkError = (fn) => function(req, res, next) {
    // console.log({ fn: fn(req, res) });
    return fn(req, res, next).catch(next);
};

export default checkError;
