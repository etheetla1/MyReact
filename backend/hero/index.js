const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const BUCKET_NAME = 'knowelist.com';
const HERO_KEY = 'public/data/hero.json';

exports.handler = async (event) => {
  try {
    const data = await s3.getObject({
      Bucket: BUCKET_NAME,
      Key: HERO_KEY
    }).promise();

    const hero = JSON.parse(data.Body.toString('utf-8'));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow CORS for your frontend
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hero)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
