## S3 Meta Data and Image Uploader

### Configuration
To start off, create an `.env` file by copying the `.env.example` and fill in the information.

`ACCESS_KEY_ID` and `SECRET_ACCESS_KEY` can be retrieved from AWS Identity and Access Management. 

`BUCKET_NAME` and `REGION` can be viewed in the S3 Bucket.

### To Start

Instantiate the uploader and retrieve credentials from `.env` file
```
// import the class
const  MetaUploader = require("./meta-uploader");

// env reader
const  dotenv = require('dotenv');
dotenv.config();

const  awsCreds = {
  accessKeyId:  process.env.ACCESS_KEY_ID,
  secretAccessKey:  process.env.SECRET_ACCESS_KEY
};

// instantiate uploader
const  uploader = new  MetaUploader(awsCreds, process.env.BUCKET_NAME, process.env.REGION);
```

### Uploading image
To upload image call the `uploadImage` method.
```
uploader.uploadImage('cat.jpg', 'uploaded-cat.jpg').then((data) =>{
	console.log(`File uploaded successfully. ${data.Location}`);
}, (err) => {
	console.error(err);
});
```

### Uploading meta
To upload image call the `uploadImage` method and pass the meta object.
```
const  metadata = {
	id:  3,
	name:  "Juan dela Cruz"
}

uploader.uploadMeta(metadata, "metadata.json").then((data) =>{
	console.log(`File uploaded successfully. ${data.Location}`);
}, (err) => {
	console.error(err);
});
```

