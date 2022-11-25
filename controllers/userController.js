import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'



export const signin = async(req,res) => {
    const { email,password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message:"User don't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message:'Invald credentials' });

        const token = jwt.sign({ email:existingUser.email, id:existingUser._id}, 'kendix', { expiresIn:"3h" });

        res.status(200).json({ result:existingUser, token })
        
    } catch (error) {
        res.status(500).json({ message:'something went wrong' })
    }
};


export const signup = async(req,res) => {
    const {firstName,lastName,email,password,comfirmPassword} = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message:'User allready exists!. signin instead.'});

        if(password !== comfirmPassword) return res.status(400).json({ message:"password don't match" });

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await User.create({ email,password:hashedPassword,userName:`${firstName} ${lastName}`});

        const token = jwt.sign({ email:result.email, id:result._id }, 'kendix', { expiresIn:'3h' });

        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json({ message:'something went wrong' });
    }
}