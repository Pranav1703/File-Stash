import mongoose from "mongoose"

const fileSchema = new mongoose.Schema({
    file: {type: String},
    user: {type: String},
},
{
    timestamps:true,
});

export const File = mongoose.model('File',fileSchema);