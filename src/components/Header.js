import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header=()=>{
  const dispatch=useDispatch();
  const user=useSelector((store)=>store.user);
  const navigate=useNavigate();
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName, photoURL} = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
        // ...
        navigate("/browse");
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });

    return ()=>unsubscribe();
  },[]);

  return (
    <div className="w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO}
      alt="logo"
      />
      {user&&<div className="flex">
        <img
        
        className="w-10 h-10 m-4 rounded-lg "
         alt="logo"
         src={user.photoURL}
        />
         <button className="my-4 px-4 shadow-lg bg-purple-500 rounded-lg text-white" 
         onClick={handleSignOut}
         >Sign Out</button>
         {/* <label>{user.displayName}</label> */}
      </div>}
      
    </div>
  );
};

export default Header;