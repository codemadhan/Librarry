import pool from "../utitlities/database.js";
import bcrypt from 'bcrypt';

export const userLogin = async (req , res) => {
    try{
        const {email , password} = req.body;

        const [result]  = await pool.query('SELECT * FROM user WHERE email = ?' , [email])
        if(result.length == 0){
            return res.status(404).json({message : 'User not found'});
        }

        const user = result[0];

        const isPassCorrect = await bcrypt.compare(password , user.password);

        if(isPassCorrect){
            res.json({data : user});
        }
        else{
            res.status(401).json({message : 'Password Invalid'});
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({message : 'Internal Server Error'});
    }
} 

export const userSignup = async (req , res) => {
    try{
        const {name , email , phoneNumber , password} =  req.body;
        const hashedPassword = await bcrypt.hash(password  ,10); 

        const [result] = await pool.query('INSERT INTO user (user_name , email , phone_number , password) VALUES(? , ? , ? , ?)' , [name , email , phoneNumber , hashedPassword]);
        console.log(result);

        res.status(200).json({message : 'User added successfully'});

    }
    catch(error){
        console.error(error);
        res.status(500).json({message : 'Internal Server Error'});
    }
} 