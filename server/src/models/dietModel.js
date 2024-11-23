import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const dietSchema = new Schema({
    
    food: {
        type: String, 
        required: true,
    },
    
    meal: {
        type: String, 
        required: true,
    },
    protein: {
        type: Number,
        required: true,
    },
    carbs:{
        type: Number,
        required: true,
    },
    calories:{
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Diet', dietSchema);
