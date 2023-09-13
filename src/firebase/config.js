import env from "react-dotenv";
const {
  FB_APIKEY,
  FB_AUTHDOMAIN,
  FB_PROJECTID,
  FB_STORAGEBUCKET,
  FB_MESSAGINGSENDERID,
  FB_APPID,
} = env;

export const firebaseConfig = {
  apiKey: FB_APIKEY,
  authDomain: FB_AUTHDOMAIN,
  projectId: FB_PROJECTID,
  storageBucket: FB_STORAGEBUCKET,
  messagingSenderId: FB_MESSAGINGSENDERID,
  appId: FB_APPID,
};
