import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { removeGptMovieResults, toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // ...
        navigate("/browse");
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
    dispatch(removeGptMovieResults());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between ">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-2 justify-between">
          {showGptSearch && (
            <select
              onChange={handleLanguageChange}
              className="p-2 my-4 bg-gray-900 m-2 text-white rounded-lg"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-0 px-4 mx-4 my-4 bg-blue-600 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
          <img
            className="hidden md:block w-10 h-10 m-4 rounded-lg "
            alt="logo"
            src={user.photoURL}
          />
          <button
            className="my-4 px-4 shadow-lg bg-black bg-opacity-30 rounded-lg text-white"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
          {/* <label>{user.displayName}</label> */}
        </div>
      )}
    </div>
  );
};

export default Header;
