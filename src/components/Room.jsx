import { SignOut } from "./Auth.jsx";
import ChatRoom from "./ChatRoom.jsx";
import { UserContext } from "../App.jsx";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import SelectRoom from "./SelectRoom.jsx";
import Help from "./Help.jsx";

export default function Room() {
    const user = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    function getLastPart() {
        const hashPath = location.hash || location.pathname; // fallback if needed
        const parts = hashPath.split("/");
        return parts.at(-1);
    }

    function handleOnClick() {
        navigate(`/home`);
    }

    function handleOnClick2() {
        navigate(`/home/help`);
    }

    return user && (
        <div className="flex flex-col App mx-auto w-full h-screen pb-2 border-white border-b-2 bg-[url('../public/black2.png')]">
            <header className="flex flex-col items-center bg-gradient-to-r from-purple-500 via-violet-900 to-purple-500">
                <div className="w-fit m-1 text-2xl">
                    <span className="justify-self-start mr-auto font-bold text-3xl">
                        {getLastPart() !== "home" && getLastPart() !== "help" ? getLastPart().toUpperCase() : null}
                    </span> ⚛️🔥💬
                </div>
                <div className="flex mx-10">
                    {user && <SignOut />}
                    <button
                        className="mx-4 flex h-fit w-fit px-2 py-1 m-5 bg-gray-700 rounded-2xl text-xl border-2 border-white
                     hover:border-black hover:bg-white hover:text-black hover:font-bold text-white"
                        onClick={handleOnClick2}
                    >
                        Help
                    </button>
                    {getLastPart() !== "home" && (
                        <button
                            className="mx-4 flex h-fit w-fit px-2 py-1 m-5 bg-gray-700 rounded-2xl text-xl border-2 border-white
                     hover:border-black hover:bg-white hover:text-black hover:font-bold text-white"
                            onClick={handleOnClick}
                        >
                            Back
                        </button>
                    )}
                </div>
            </header>
            <div className="flex flex-col flex-auto overflow-auto ">
                <Routes>
                    <Route index element={<SelectRoom />} />
                    <Route path="help" element={<Help />} />
                    <Route path="room/:roomId" element={<ChatRoom />} />
                </Routes>
            </div>
        </div>
    );
}
