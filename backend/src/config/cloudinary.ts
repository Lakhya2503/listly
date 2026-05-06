import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { ApiError } from '../utils/ApiError';
import { ENV } from './env';


cloudinary.config({
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
});



const uploadAvatar = async function (localFilePath: string) {
    try {
        if (!localFilePath) {
            throw new ApiError(404, "localFile not found")
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        return response
    } catch (error : any) {
        fs.unlinkSync(localFilePath)
        throw new ApiError(404, error.message || 'local file not found')
    }

}

export default uploadAvatar;
