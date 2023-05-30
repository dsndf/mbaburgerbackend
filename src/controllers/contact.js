import contactCollection from "../models/Contact.js";

 const sendContactInfo = async (req,res,next)=>{
const data =   await contactCollection.create(req.body);
res.json({
    success:true,
    data
})
}
export default sendContactInfo;