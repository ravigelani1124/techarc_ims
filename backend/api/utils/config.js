module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'default-secret-key',
    AWS_ACCESS_KEY_ID: 'YOUR_AWS_ACCESS_KEY_ID',
    AWS_SECRET_ACCESS_KEY: 'YOUR_AWS_SECRET_ACCESS_KEY',
    AWS_BUCKET_NAME: 'YOUR_AWS_BUCKET_NAME',
    AWS_REGION: 'us-east-1' // Change to your desired AWS region
  };
  