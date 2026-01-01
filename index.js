const express = require('express');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();
const db = require('mysql2/promise');

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

app.get('/db', async (req, res) => {
  const database = db.createPool(
    {
      host: process.env.AWS_DATABASE_HOST,
      database: process.env.AWS_DATABASE_NAME,
      port: 3306,
      password: process.env.AWS_DATABASE_PASSWORD,
      user: process.env.AWS_USER,
      connectionLimit: 10,
      queueLimit: 0
    }
  );

  try {
   await database.getConnection() 
  } catch (error) {
    console.error(error);
  }

  await database.query(
    `
      CREATE TABLE IF NOT EXISTS employee_details
      (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(20) NOT NULL,
        age INT NOT NULL
      );
    `
  );

  await database.query(
    `
      INSERT INTO employee_details
      (name, age)
      VALUES
      ('Niranjan Patil', 25);
    `
  );

  res.send(row);
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running at http://0.0.0.0:3000');
});