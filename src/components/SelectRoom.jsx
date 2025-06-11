import {useNavigate} from "react-router-dom";
import {firebaseApp} from "../config.js";
import {collection, getFirestore, query} from "firebase/firestore";
import {useCollection} from "react-firebase-hooks/firestore";
import {useEffect, useState} from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {MdArrowBackIos, MdArrowForward, MdArrowForwardIos} from "react-icons/md";
import '../index.css';
import '../fonts.css';
import {GoDotFill} from "react-icons/go";

export default function SelectRoom(){
    const navigate=useNavigate();
    const [roomId, setRoomId]=useState('')
    const firestore = getFirestore(firebaseApp);
    const collectionRef = collection(firestore, "listCollections");
    const [list] = useCollection(query(collectionRef));

    let temp = []
    list &&
    list.docs.reverse().map((msg) => (
        temp.push(msg.data('text'))
    ));

    function handleOnClick(){
        navigate(`/home/${roomId}`);
    }
    const handleOnClick2 = (e,room) =>{
        navigate(`/home/${room}`);
    }
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 1024 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 1024, min: 800 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 800, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        }
    };

    const CustomDot = ({ onMove, index, onClick, active }) => {
        return (
            <li
                className={active ? "active" : "inactive"}
                onClick={() => onClick()}
            >
                <GoDotFill className={"text-1xl"} />
            </li>
        );
    };

    return(
        <div className={"flex flex-col"}>
            <h1 className={"flex mt-2 justify-center text-4xl rubik"}>Channels</h1>
            <Carousel
                responsive={responsive}
                customDot={<CustomDot/>}
                showDots={true}
                autoPlaySpeed={2000}
                autoPlay={true}
                infinite={true}
                customLeftArrow={
                    <MdArrowBackIos
                        className="text-4xl absolute mx-auto left-4 max-w-4 cursor-pointer hover:text-black text-indigo-500"
                    />
                }
                customRightArrow={
                    <MdArrowForwardIos
                        className="text-4xl absolute mx-auto right-4 max-w-4 cursor-pointer hover:text-black text-indigo-500"
                    />
                }
            >
                {temp.map((msg) => (
                    <div className="flex bg-[#D7BA89] hover:bg-[#E2AC44] font-semibold text-2xl h-32 justify-center items-center mx-2 mt-4 mb-6 rounded-2xl" onClick={e =>handleOnClick2(e,msg.text)} >
                    <span className={"text-black"}>{msg.text.toUpperCase()}</span>
                    </div>
                ))
                }
            </Carousel>
            <div className="flex flex-col w-80 h-[400px] bg-[#E69EFF]  border-2 border-gray-500 rounded-2xl items-center mx-auto justify-center mt-10 my-auto
            "> <span className="text-3xl font-bold text-black mb-16">Enter Room Id:</span>
                <input type="text"
                       value={roomId}
                       placeholder={"Ex-messages"}
                       onChange={e=> setRoomId(e.target.value)}
                       className="bg-gray-100 mb-5 rounded-2xl w-52 h-9 p-2 text-black"
                />
                <button className=" bg-gray-100 border-2 border-gray-500
            rounded-xl w-20 h-10 p2 font-bold text-black hover:bg-gray-300" onClick={handleOnClick}>Submit</button>
            </div>
        </div>
    )
}