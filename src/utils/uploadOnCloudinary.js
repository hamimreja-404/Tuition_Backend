import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: 'dm01lhkax',
    api_key: '478111175248196',
    api_secret: 'hHwnnOsRaB9unAEKMvlB9ocrnQw',
    // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    // api_key: process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploaddOnCloudinary = async (filePath)=>{
    console.log(api_key)
    try {
        const pdf = await cloudinary.uploader.upload(filePath,{
            folder: "answerkeys",
            use_filename: true,
            unique_filename: true,
        })
    } catch (error) {
        // throw new ApiError (500, "Failed to upload file to Cloudinary");
        console.error("Error uploading to Cloudinary:", error);
         process.exit(1);
    }
    return pdf.url;
}
console.log(uploaddOnCloudinary("D:/Photos/00100sPORTRAIT_00100_BURST20211016171429286_COV.jpg"))
export default uploaddOnCloudinary;