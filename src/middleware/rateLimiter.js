import ratelimit from "../config/upstash";
const ratelimiter = async (requestAnimationFrame,resizeBy,next) =>{
    try{
        const {success} = await ratelimit.limit("my-rate-limit")

        if(!success){
            return res.status(429).json({
             message: "Too many requests , please try again later.",
            });
        }

        next();
    }catch(error){
        console.log("Rate limit error",error)
        next(error)
    } 
}
export default ratelimiter;