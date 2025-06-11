import Accordion from "./Accordion.jsx";
import Email from "./Email.jsx";
const items = [
    {
        title: "What is purpose of this App ",
        content: "This chat app servers as a vital role in real time communication, offering users the ability to engage in instant messaging and share thoughts/views effortlessly. " +
            "Here we are letting users go to the chat rooms of their interest and then talk to new people with similar interest."
    },
    {
        title: "How to give Feedback",
        content: "On the right side you can see there is an option to send an email. You can use that to send feedback or ask for any help regarding app from our customer support team. Write you concern and hit the submit button"
    },
    {
        title: "How to make a new public channel",
        content: "Hit the back button on top and you will be taken to a page with multiple pre-made chat rooms, on the right side there you will se a dialog box saying 'enter chat id' use that to create your own chat room and share it with friends to chat"
    },
    {
        title: "How to sign/signout",
        content: "On the top you can see there is button to sign out. You can press that to sign out and it will take you to the login page and login page has options to login by google"
    }
]

export default function Help() {
    return (
            <div className={"flex mt-10"}>
                <div className={"flex-col ml-10"}>
                    <p className={"text-4xl text-pink-200 text-center mb-5 font-bold"}>FAQs</p>
                    <Accordion items={items}/>
                </div>
                <div className={"flex-col"}>
                    <p className={"text-4xl text-pink-200 text-center mb-5 font-bold"}>Share Feedback</p>
                    <Email/>
                </div>
                {console.log('help')}
            </div>
        )
}