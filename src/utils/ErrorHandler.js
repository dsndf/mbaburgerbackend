const errorHandler = (message,statusCode)=>{

const err = new Error(message);
err.statusCode = statusCode;
return err;
}
export default errorHandler;
