import express from "express";
import admin from "../config/firebaseAdmin.js"

const router = express.Router();

router.post("/verify-token",async (req,res)=>{
    const {token} = req.body;
    try {
        const decoded = await admin.auth().verifyIdToken(token);
        res.status(200).json({user:decoded});
    } catch (error) {
        res.status(401).json({error:"invalid token"});
    }
})

export default router;