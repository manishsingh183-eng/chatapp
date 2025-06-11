import emailjs from '@emailjs/browser'
import {useState} from "react";
import './Email.css'
function Email() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const serviceId = 'service_2hka0cu';
        const templateId = 'template_6dh752k';
        const publicKey = '5BR-xZxKx0JiPa1vB';

        const templateParams = {
            from_name: name,
            from_email: email,
            to_name: 'chatAppService',
            message: message,
        };

        emailjs.send(serviceId,templateId,templateParams,publicKey)
            .then((response)=>{
                console.log('Email sent successfully',response);
                setName('');
                setEmail('');
                setMessage('');
            })
            .catch((error)=>{
                console.error('Error sending email:',error);
            })
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col mx-10 w-full text-black">
            <input
                type="text"
                placeholder="your name"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                className={"h-10 border-2 border-black p-2"}
            />
            <input
                type="email"
                placeholder="your email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                className={"h-10 border-2 border-black p-2"}
            />
            <textarea
                cols={"80"}
                rows={"10"}
                value={message}
                onChange={(e)=>{setMessage(e.target.value)}}
                className={" border-2 border-black p-2"}
            ></textarea>
            <button className={"border-2 w-1/5 px-2 border-[#AE33DAFF] font-semibold rounded-2xl text-white text-2xl hover:bg-[#E063FFFF] bg-[#AE33DAFF]"} type="submit">Send</button>
        </form>
    );
}
export default Email;