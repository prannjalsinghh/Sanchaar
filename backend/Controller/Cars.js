const Car = require('../Schemas/Cars')
const createNewCar = async(req,res) =>{
    try{
        const car = new Car({
            carNumber:req.body.carNumber,
            carOwnerName:req.body.carOwnerName,
            carOwnerNumber:req.body.carOwnerNumber,
            isMissing:true,
        })
        await car.save();
        res.send(car);
    }catch(err){
        res.status(404).send({message : 'Could not create'});
    }
} 
const lookForMissingCar = async(req,res) =>{
    try{
        const cars = await Car.find({ carNumber : req.params.id });
        if(cars.length === 0){
            res.status(404).send({message: 'Not found'});
            return;
        }
        const car = cars[0];
        res.status(201).send(car);
    }catch(err){
        res.status(404).send({ message:'Not Found' });
        return;
    }
}
const updateMissingCar = async(req,res) =>{
    try{
        
        const car = await Car.findOne({ carNumber : req.body.carNumber});
        if(!car){
            res.send({message: 'Not found'});
            return;
        }
        await car.updateOne({ isMissing : req.body.isMissing, isClaimed : req.body.isClaimed });
        res.send(car);
    }catch(err){
        res.send({ message:'Not Found' });
        return;
    }
}

module.exports = {createNewCar, lookForMissingCar, updateMissingCar};