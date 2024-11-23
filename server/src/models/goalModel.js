import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const goalSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model("Goal", goalSchema);
