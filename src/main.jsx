import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import './index.css'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDembRzFLXgEvz4nrXoaBl1HCDwr5hQqlo",
  authDomain: "my-react-blog-ade28.firebaseapp.com",
  projectId: "my-react-blog-ade28",
  storageBucket: "my-react-blog-ade28.appspot.com",
  messagingSenderId: "545613159993",
  appId: "1:545613159993:web:0dd1c66abfc75941f5b7e8"
};


const app = initializeApp(firebaseConfig);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
