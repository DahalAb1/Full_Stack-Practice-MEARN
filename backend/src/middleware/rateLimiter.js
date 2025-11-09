import rateLimt from "../config/upstash.js";

const rateLimiter = async (req,res,next) => { 
try{ 
    const { success } = await rateLimt.limit("my-limit-key"); 
    if(!success){ 
        return res.status(429).json({
            message:"Too many message, please try again later."
        });  
    }
    next();
}catch(error){ 
 console.log("Rate limit error",error); 
 next(error); 
}
}

export default rateLimiter; 