import {
    addDoc, setDoc, doc, collection,
    getDocs, getFirestore, limit,
    orderBy, query, startAfter
} from "firebase/firestore";
import { auth, firebaseApp } from "../config.js";
import { useEffect, useRef, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage.jsx";
import { useParams } from "react-router-dom";

export default function ChatRoom() {
    const { roomId } = useParams();

    const [currentScrollPos, setScrollPos] = useState(-1);
    const messagesWindowRef = useRef(null);
    const dummy = useRef();

    const scrollToBottom = () => dummy.current.scrollIntoView();
    const scrollPos = (pos) => {
        const el = messagesWindowRef.current;
        return el.scrollHeight - el.clientHeight - (pos ?? el.scrollTop);
    };
    const toScrollPos = (pos) => {
        const el = messagesWindowRef.current;
        el.scrollTo(0, scrollPos(pos));
    };
    const scrollPercentWRTScreen = () => {
        const el = messagesWindowRef.current;
        return scrollPos() * 100 / el.clientHeight;
    };

    const [messages, setMessages] = useState([]);

    const firestore = getFirestore(firebaseApp);

    const collectionRef = collection(firestore, "listCollections");
    const messagesRef = collection(firestore, roomId || "messages1");
    const messagesDisplayLimit = Math.round(window.innerHeight / 40);
    const msgQuery = (createdAt = 9999999999999) => query(
        messagesRef,
        orderBy("createdAt", "desc"),
        startAfter(createdAt),
        limit(messagesDisplayLimit)
    );

    const [batch] = useCollection(msgQuery());
    const [list] = useCollection(query(collectionRef));
    let temp = [];

    async function getNextPage() {
        setScrollPos(scrollPos());
        const docSnap = await getDocs(msgQuery(messages[0].data().createdAt));
        setMessages([...docSnap.docs.reverse(), ...messages]);
    }

    useEffect(() => {
        if (currentScrollPos > 0) toScrollPos(currentScrollPos);
    }, [messages]);

    useEffect(() => {
        checkList();
        setMessages((messages) => {
            if (!messages?.length || scrollPercentWRTScreen() < 70) {
                setScrollPos(-1);
                scrollToBottom();
            }
            return [...messages.slice(0, -messagesDisplayLimit + 1), ...(batch?.docs || []).reverse()];
        });
    }, [batch]);

    const updateList = async () => {
        await addDoc(collectionRef, {
            text: roomId,
            createdAt: Date.now(),
        });
    };

    function checkList() {
        let flag = 0;
        list &&
            list.docs.reverse().map((msg) => temp.push(msg.data("text")));

        temp &&
            temp.map((msg) => {
                if (msg.text == roomId) flag = 1;
            });

        if (temp.length > 0 && flag === 0 && roomId) updateList();
    }

    const [formValue, setFormValue] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser;
        await addDoc(messagesRef, {
            text: formValue,
            createdAt: Date.now(),
            uid,
            photoURL,
        });
        setFormValue("");
        scrollToBottom();
    };

    return (
        <>
            <main ref={messagesWindowRef} className="flex flex-col px-2 overflow-auto">
                <button
                    onClick={getNextPage}
                    className="rounded-2xl text-xl font-semibold bg-white border-2 border-black text-black">
                    load more
                </button>
                {messages &&
                    messages.slice(0, -messagesDisplayLimit).map((msg) => (
                        <ChatMessage key={msg.id} message={msg.data()} />
                    ))}
                {batch &&
                    batch.docs.reverse().map((msg) => (
                        <ChatMessage key={msg.id} message={msg.data()} />
                    ))}
                <span ref={dummy} />
            </main>
            <form className="flex mt-auto" onSubmit={sendMessage}>
                <textarea
                    rows={formValue.length > 100 ? 2 : 1}
                    className="w-full rounded-2xl py-1.5 px-2 m-2 flex bg-white border-2 border-black text-black min-w-fit"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder="say something nice"
                />
                <button className="mr-auto text-3xl flex my-2 p-1.5" type="submit" disabled={!formValue}>
                    🕊
                </button>
            </form>
        </>
    );
}
