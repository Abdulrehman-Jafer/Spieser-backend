import { initializeApp } from "firebase/app";
import { getStorage, ref,deleteObject } from "firebase/storage";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGPj-xo06mWqdXedTp3Z8XUDN_Bbv628c",
  authDomain: "mern-app-61a6f.firebaseapp.com",
  projectId: "mern-app-61a6f",
  storageBucket: "mern-app-61a6f.appspot.com",
  messagingSenderId: "395494011826",
  appId: "1:395494011826:web:afd24c3bb9024841646aab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const deleteFromStore = async (url) => {
  const imageRef = ref(storage, `${url}`);
  await deleteObject(imageRef)
    .then(() => {
      console.log("Sucessful");
    })
    .catch((err) => {
      console.error(err);
      console.log("uh oh something went wrong");
    });
};
