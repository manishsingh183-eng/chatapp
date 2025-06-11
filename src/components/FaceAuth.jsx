import { useState } from 'react'
import {auth} from "../config.js";
import { useEffect } from 'react'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import '../App.css'
import {useNavigate} from "react-router-dom";


export function Face() {
    let faceio;
    useEffect(() => {
        faceio = new faceIO("fioa7ed3");
    }, []);

    const faceFirebase = () => {
        createUserWithEmailAndPassword(auth, 'example@gmail.com', '1234')
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    const faceFirebaseSignin = () => {
        signInWithEmailAndPassword(auth, '20051881@kiit.ac.in', '123456')
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    const handleSignIn = async ()  => {
        try {
            let response = await faceio.enroll({
                locale: "auto",
                payload: {
                    email: "example@gmail.com",
                    pin: "12345",
                },
            });

            console.log(` Unique Facial ID: ${response.facialId}
      Enrollment Date: ${response.timestamp}
      Gender: ${response.details.gender}
      Age Approximation: ${response.details.age}`);
        } catch (error) {
            console.log(error);
        }
    };
    const handleLogIn = async () => {
        try {
            let response = await faceio.authenticate({
                locale: "auto",
            });
            faceFirebaseSignin();
            console.log(` Unique Facial ID: ${response.facialId}
          PayLoad: ${response.payload}
          `);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <button className={"bg-gray-700 rounded-2xl ml-[10px] mt-[440px] text-2xl border-2 border-white h-fit w-fit px-3 py-1 m-1" +
                "            hover:border-black hover:bg-white hover:text-black hover:font-bold text-white"} onClick={handleSignIn} >Sign-in with face</button>
            <button className={"bg-gray-700 rounded-2xl ml-[10px] mt-[440px] text-2xl border-2 border-white h-fit w-fit px-3 py-1 m-1" +
                "            hover:border-black hover:bg-white hover:text-black hover:font-bold text-white"} onClick={handleLogIn}>Log-in with face</button>
        </div>
    );
}