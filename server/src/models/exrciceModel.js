import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    bodyPart: {
        type: String,
        required: true,
    },
    equipment: {
        type: String,
        required: true,
    },
    gifUrl: {
        type: String, // URL to the  demonstrating the exercise
        required: true,
    },
    target: {
        type: String, 
        required: true,
    },
});

export default mongoose.model('Exercise', exerciseSchema);
