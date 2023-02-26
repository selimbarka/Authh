import { Response, Request } from 'express';
import { generateToken } from './token.utils';
import { sendResetEmail } from './email.utils';




export const login = async (req: Request, res: Response , next : any) => {

const {email, password} = req.body;
if (!email || !password) {           
    return res.status(400).json({
        status: 400,
        error: 'email and password  is required'
    });

 try {
const user = await User.findOne({email}).select({password});

if(!user){
    return res.status(400).json({error: 'User not found'});
}

const isMatch = await User.matchPassword(password);
if(!isMatch){
    return res.status(400).json({error: 'Password is incorrect'});
}else {
return next(
    res.status(201).json({
        status: 200,
        message:"user successfuly logged in ",
        token: user.getSignedToken()
    })
);

}

}catch (err:any) {
    return res.status(500).json({
        status: 500,
        error: err.message
    });

}};

export const forgotPassword = async (req: Request, res: Response, next : any) => {
    const {email} = req.body;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
      }

    if (!email) {
        return res.status(400).json({
            status: 400,
            error: 'email is required'
        });
try{
    const user = await User.findOne({email});
    if (!user) {
        return res.status(400).json({
            status: 400,
            error: 'User not found'
        });

        const token = generateToken();
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        sendResetEmail(user.email, token);

        res.json({ message: 'Password reset email sent' });



}


}
