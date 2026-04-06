import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const registerUser =async(req,res) =>{
    try{
        const {name,email,password,role} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        };
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser =await User.create({
            name,
            email,
            password:hashedPassword,
            role: role || 'Viewer'
        });
        const token =
        jwt.sign({
            id: newUser._id,
            role: newUser.role},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        res.status(201)
        .json(
            {
                success:true,
                message:"User registered successfully",
                token,
                user:{
                    id:newUser._id,
                    name:newUser.name,
                    email:newUser.email,
                    role:newUser.role
                }
            }   
        );
    }    
        catch(error){
            res.status(500).json({message:"Server error during registration"});  
            };
};

export const loginUser = async(req, res)=>{
   try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (user.status === 'inactive') {
      return res.status(403).json({ error: 'Account is inactive. Contact admin.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  };
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { name, email, role, status } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role, status },
            { new: true, runValidators: true, returnDocument: 'after' }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};