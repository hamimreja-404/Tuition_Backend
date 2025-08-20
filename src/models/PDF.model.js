import {mongoose, Schema} from "mongoose";


const PDSchema = new Schema({
    fileURL:{
        required: true,
        type: String
    },
    title :{
        required:true,
        type: String
    }
},{
    timestamps:true
}
)


const PDFUrl = mongoose.model("pdf", PDSchema);
export default PDFUrl;