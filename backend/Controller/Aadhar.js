const Aadhar = require('../Schemas/AadharSchema');

const findAadhar = async(req, res) =>{
    const _id = req.params.id;
    try{
        const person = await Aadhar.find({aadhar_number:_id});
        if(!person){
            res.status(404).send({message:'Data Not Found'});
        }
        const result = person[0];
        res.send(result);
    }catch(err){
        throw new Error(err);
    }
}

module.exports = {findAadhar};