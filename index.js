const express = require('express');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.send('Default page printed!');
});

app.get('/login', (req, res) => {
  res.send('login printed!');
});

app.get('/logout', (req, res) => {
  res.send('logout printed!');
});

app.get('/send', async (req, res) => {
  const s3 = new S3Client(
    {
      region: process.env.AWS_REGION
    }
  );

  await s3.send(
    new PutObjectCommand(
      {
        Bucket: process.env.AWS_BUCKET,
        Key: "File.txt",
        Body: 'This is sample text from File.txt to S3!'
      }
    )
  );

  res.send('Sent! Please check in the bucket the file must be in!');
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running at http://0.0.0.0:3000');
});