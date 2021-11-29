import cloudinary from "../config/cloudinary";

function uploadToCloudinary(image) {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(image, (err, response) => {
            if (err) return reject(err);
            return resolve(response.url);
        })
    });
}
export default uploadToCloudinary
