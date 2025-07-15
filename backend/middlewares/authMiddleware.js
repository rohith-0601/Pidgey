const admin = require("../config/firebaseAdmin");

const verifyFirebaseToken = async(req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"Unauthorized: No token provided"})
    }
    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Firebase Auth Error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}


module.exports = verifyFirebaseToken;