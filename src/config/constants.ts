import dotenv from 'dotenv';
dotenv.config();

/*
  A constant file that can be used in any place in the project.
  It contains constants for MESSAGES,CLOUDINARY,REDIS_CONFIGURATION,DB_COLLECTION,MAX_NO_OF_REF_PER_PLAN
  and most of the constants actual values are placed in the .env file in the project
*/
const constants = {
  APP_NAME: "Minx",
  PORT: process.env.PORT,
  DATABASE_URI: process.env.DATABASE_URI,
  JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY,
  JWT_USER_LOGIN_EXPIRATION: 2,
  
  // Cloudinary
  CLOUDINARY: {
    NAME: process.env.CLOUDINARY_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,
  },
  
  //Redis Configuration
  REDIS_CONFIGURATION: {
    REDIS_PORT: Number(process.env.REDIS_PORT),
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_URL: process.env.REDIS_URL,
    REDIS_TLS_URL: process.env.REDIS_TLS_URL,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  },

  // The name of all our collections in the database
  DB_COLLECTION: {
    USER: "USER",
    CONVERSATION: "CONVERSATION"
  },

  // Investment constants

  MAX_NO_OF_REF_PER_PLAN: 6,

  MESSAGES: {
    USER_EXIST: "User already exists",
    USER_CREATED: "User created successfully",
    USER_LOGGED: "User logged in successfully",
    USER_UPDATED: "User updated successfully",
    USER_NOT_EXIST: "User does not exist",
    USER_ACTIVITY_GOTTEN: "User activities gotten successfully",
    ALREADY_EXIST: "Resource already exists",
    CREATED: "Resource created successfully",
    FETCHED: "Resource fetched",
    UPDATED: "Resource updated successfully",
    DELETED: "Resource deleted successfully",
    NOT_FOUND: "Not found",
    INVALID_CREDENTIALS: "Invalid credentials",
    INVALID_PASSWORD: "Invalid password",
    PASSWORD_MISMATCH: "Password mismatch detected",
    PASSWORD_RESET_SUCCESS: "Password reset successful",
    FILE_NOT_FOUND: "File not found",
  },
}


export default constants;
