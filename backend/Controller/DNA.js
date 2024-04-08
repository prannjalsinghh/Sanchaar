const DNA = require('../Schemas/DNASchema')
const Aadhar = require('../Schemas/AadharSchema');
const getDetailsByDNA = async(req, res) =>{
    const dna = req.params.dna;
    const detailsOfDNA = await DNA.findOne({ DNADetails : dna });
    try{
        const person = await Aadhar.findById(detailsOfDNA.person);
        if(!person){
            res.status(404).send({message:'Data Not Found'});
        }
        const result = person;
        res.send(result);
    }catch(err){
        throw new Error(err);
    }
}
const addDNA = async(req,res) =>{
    const dna = new DNA({
        DNADetails : req.body.dna,
        person: req.body.person
    })

    await dna.save();
    res.send(dna);
}

module.exports = {getDetailsByDNA, addDNA}
