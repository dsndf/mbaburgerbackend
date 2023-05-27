
const customErrorHanlder = (err,req,res,next)=>{
if(err.name === "CastError"){
    err.message = "Order Not Found!"
    err.statusCode = 404 
}
err.message = err.message||"Something went wrong";
err.statusCode =  err.statusCode||500;
console.log("error message is ",err.message);
res.status(err.statusCode).json({
    success:false,
    message:err.message,
    status:err.statusCode,
    error:err.name
});
}
export default customErrorHanlder;