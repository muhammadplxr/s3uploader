
const mime = require('mime-types');
const AWS = require('aws-sdk');
const fs = require('fs');

class MetaUploader {
    constructor(awsCredentials, bucketName, region) {
        this.s3 = new AWS.S3({
            accessKeyId: awsCredentials.accessKeyId,
            secretAccessKey: awsCredentials.secretAccessKey
        });

        this.bucketName = bucketName;
        this.region = region;
    }

    upload(content, contentType, destinationPath) {
        const uploadParams = {
            Bucket: this.bucketName,
            Key: destinationPath, 
            Body: content,
            ContentType: contentType,
            ACL:'public-read'
        };

        return new Promise((resolve, reject) => {
            this.s3.upload(uploadParams, function(err, data) {
                if (err) {
                    return reject(err);
                }else{
                    return resolve(data);
                }
            });
        })
    }

    uploadFile(sourcePath, destinationPath) {
        const fileContent = fs.readFileSync(sourcePath);
        return this.upload(fileContent, mime.lookup(sourcePath), destinationPath);
    }

    uploadMeta(metaObject, destinationPath) {
        return this.upload(JSON.stringify(metaObject), 'application/json', destinationPath);
    }
}

module.exports = MetaUploader;