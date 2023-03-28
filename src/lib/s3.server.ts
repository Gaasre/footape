import S3 from 'aws-sdk/clients/s3'

const s3Client = new S3({
    accessKeyId: process.env.AWS_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: process.env.AWS_S3_ENDPOINT,
    region: 'fr-par',
    signatureVersion: "v4",
    params: { Bucket: 'footape' },
})

export default s3Client