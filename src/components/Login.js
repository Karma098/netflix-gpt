import { checkValidData } from "../utils/validate";
import Header from "./Header";
import { useRef, useState } from "react";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { BG_IMG, USER_AVATAR } from "../utils/constants";
import {FaEye,FaEyeSlash} from "react-icons/fa";
import Button from 'react-bootstrap-button-loader';


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage,setErrorMessage]=useState(null);

  const [isLoading,setIsLoading]=useState(false);

  const [showPassword,setShowPassword]=useState(false);

  const dispatch=useDispatch();

  const name=useRef(null);
  const email=useRef(null);
  const password=useRef(null);

  const handleButtonClick=()=>{
    //Validate the form data
    // console.log(email.current.value);
    // console.log(password.current.value);
    
    const message=checkValidData(email.current.value,password.current.value);
    setErrorMessage(message);
    if(message) return;

    if(!isSignInForm){
      //Sign up logic
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, photoURL: USER_AVATAR
        }).then(() => {
          // Profile updated!
          // ...
          const {uid,email,displayName, photoURL} = auth.currentUser;
          dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
          setIsLoading(false);
        }).catch((error) => {
          // An error occurred
          // ...
          setErrorMessage(errorMessage);
          setIsLoading(false);
        });
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+ "-" +errorMessage);
        setIsLoading(false);
      });
    }
    else {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        const {uid,email,displayName, photoURL} = auth.currentUser;
          dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
          setIsLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-"+errorMessage);
        setIsLoading(false);
      });
    }
  }

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const togglePasswordVisibility=()=>{
    setShowPassword(!showPassword);
  }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
        className="h-screen object-cover md:h-fit"
          src={BG_IMG}
          alt="bg"
        />
      </div>
      <form onSubmit={(e)=>e.preventDefault()} className="w-3/4 md:w-3/12 absolute p-12 bg-black mx-auto my-36 left-0 right-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm&&<input
          ref={name}
          type="text"
          placeholder="Full Name"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />
        <div className="flex">          
          <input
            ref={password}
            type={showPassword?"text":"password"}
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-700 rounded-lg"
          />
          <button
          onClick={togglePasswordVisibility} 
          className="my-7 px-2 rounded-full bg-gray-700 hover:bg-black -ml-8">{showPassword?<FaEyeSlash/>:<FaEye/>}</button>
        </div>
        <p className="font-bold text-lg py-2 text-red-600">{errorMessage}</p>
        {!isLoading?<button className="hover:opacity-80 active:opacity-60 p-4 my-6 bg-red-700 w-full rounded-lg"
        onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>:<Button className="hover:opacity-80 active:opacity-60 p-4 my-6 bg-red-700 w-full rounded-lg" loading={true} disabled={true}></Button>}
        <p className="py-4 cursor-pointer hover:underline" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix?Sign up now"
            : "Already a member? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
