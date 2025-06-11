import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "../config.js";
import {Face} from "./FaceAuth.jsx";
import {useState} from "react";

export function SignIn() {
    const [faceLogin, setFacelogin]=useState(true);

    const handleBack = ()=>{
        setFacelogin(!faceLogin);
    }
    const signInWithFace = () => {
        setFacelogin(false);
    }
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };
    return (
        <div className={"flex flex-row w-full h-screen bg-[url('../public/front4.png')] m-"}>
            {/*<div className={"flex text-7xl mt-80 ml-20 font-bold"}>CHAT APP</div>*/}
            {(faceLogin)&&<button className="bg-gray-700 rounded-2xl ml-[800px] mt-[440px] text-2xl border-2 border-white h-fit w-fit px-3 py-1 m-1
            hover:border-black hover:bg-white hover:text-black hover:font-bold text-white" onClick={signInWithGoogle}>
                Sign in with google
            </button>}
            {faceLogin?< button className="bg-gray-700 rounded-2xl ml-[10px] mt-[440px] text-2xl border-2 border-white h-fit w-fit px-3 py-1 m-1
            hover:border-black hover:bg-white hover:text-black hover:font-bold text-white" onClick={signInWithFace}>
                Face Login
            </button>
           :<><button className={"bg-gray-700 rounded-2xl ml-[800px] mt-[440px] text-2xl border-2 border-white h-fit w-fit px-3 py-1 m-1\n" +
                "            hover:border-black hover:bg-white hover:text-black hover:font-bold text-white"} onClick={handleBack}>Back</button><Face/></>}
        </div>
    );
}

export function SignOut() {
    return (
        <>
            <button className="flex h-fit w-fit px-2 py-1 m-5 bg-gray-700 rounded-2xl text-xl border-2 border-white
hover:border-black hover:bg-white hover:text-black hover:font-bold text-white"
                    onClick={() => auth.signOut()}>
                Sign Out
            </button>
        </>
    );
}
// className="bg-gray-700 rounded-2xl text-2xl border-2 border-white
// hover:border-black hover:bg-white hover:text-black hover:font-bold text-white"