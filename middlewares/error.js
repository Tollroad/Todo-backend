class errorhandler extends Error{
    constructor(message,statusCode)
    {
        super(message);
        this.statusCode = statusCode;
    }
}



export const error = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    EvalError.statusCode = err.statusCode || 500;



  return res.status(200).json({
    message: err.message,
  });
};


export default errorhandler;