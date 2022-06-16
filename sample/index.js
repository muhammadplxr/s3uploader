const MetaUploader = require("../meta-uploader");
const dotenv = require('dotenv');
dotenv.config();


const awsCreds = {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
};
const uploader = new MetaUploader(awsCreds, process.env.BUCKET_NAME, process.env.REGION);

uploader.uploadFile('test.jpg', 'test6.jpg').then((data) =>{
    console.log(`File uploaded successfully. ${data.Location}`);
}, (err) => {
    console.error(err);
});

const metadata = {
    id: 3,
    name: "Juan dela Cruz"
}
uploader.uploadMeta(metadata, "meta6.json").then((data) =>{
    console.log(`File uploaded successfully. ${data.Location}`);
}, (err) => {
    console.error(err);
});