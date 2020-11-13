const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload = (image: any) => {
    const imageFile = image.path;
    return cloudinary.uploader.upload(imageFile, {tags: 'express_sample'}).then(function (uploadedImage: any) {
        console.log('** file uploaded to Cloudinary service');
        console.dir(uploadedImage);
        return uploadedImage;
    });
};
