import mongoose from "mongoose"

const fileSchema = new mongoose.Schema({
    file: {type: String},
    user: {type: String},
},
{
    timestamps:true,
});

export const Files = mongoose.model('File',fileSchema);