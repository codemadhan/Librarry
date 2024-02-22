import pool from "../utitlities/database.js";

export const adminLogin = async (req , res) => {
    try{
        const {email , password} = req.body;
        const [result] = await pool.query('SELECT * FROM admin WHERE email = ?' , [email]);
        
        if(result.length == 0){
            return res.status(404).json({messsage : 'User not found'});
        }

        const user = result[0];

        if(user.password == password){
            res.send(user);
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
