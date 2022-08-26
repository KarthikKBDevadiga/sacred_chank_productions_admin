/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_API_URL: "https://api.sacredchankproductions.com/",
    BASE_URL: "https://admin.sacredchankproductions.com/",

    S3_UPLOAD_KEY: "AKIA2VULEL3E5HZNKQMM",
    S3_UPLOAD_SECRET: "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",
    S3_UPLOAD_BUCKET: "sacred-chank-productions",
    S3_UPLOAD_REGION: "eu-west-2",
    S3_UPLOAD_VERSION: "2010-12-17",

    FIREBASE_API_KEY: "AIzaSyBY0_3uZU71yCt1ALTc133PQWnzynkykbA",
    FIREBASE_AUTH_DOMAIN: "sacred-chank-productions-e2a51.firebaseapp.com",
    FIREBASE_PROJECT_ID: "sacred-chank-productions-e2a51",
    FIREBASE_STORAGE_BUCKET: "sacred-chank-productions-e2a51.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: "880045333485",
    FIREBASE_APP_ID: "1:880045333485:web:ef0a2897ada4bf43d7e5e4",
    FIREBASE_MEASUREMENT_ID: "G-VB8E93X50J",
  },
};

module.exports = nextConfig;
