import errorHandler from "../utils/ErrorHandler.js"

const authorization = (role) => {
    return async (req, res, next) => {
        console.log(req.user);
        if (req.user.role !== role) {
            next(errorHandler("Only Admin Can Access These Resource", 400));
        }
        next();
    }

}
export default authorization;