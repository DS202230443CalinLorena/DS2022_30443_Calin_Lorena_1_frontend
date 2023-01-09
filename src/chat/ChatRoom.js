import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient =null;
export default function ChatRoom() {
    const [privateChats, setPrivateChats] = useState(new Map()); 
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        email: '',
        receiverEmail: '',
        connected: false,
        message: ''
      });
    useEffect(() => {
      console.log(userData);
    }, [userData]);

    const connect =()=>{
        let Sock = new SockJS('http://localhost:8081/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/'+userData.email+'/private', onPrivateMessage);
        userJoin();
    }

    const userJoin= ()=>{
          var chatMessage = {
            senderEmail: userData.email,
            status:"JOIN"
          };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                privateChats.set("admin@yahoo.com",[]);
                setPrivateChats(new Map(privateChats));
                break;
        }
    }
    
    const onPrivateMessage = async (payload)=>{
        console.log("ON PRIVATE MESSAGE METHOD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + payload);
        var payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderEmail)){
            privateChats.get(payloadData.senderEmail).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list =[];
            list.push(payloadData);
            privateChats.set(payloadData.senderEmail,list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);
        
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
          var chatMessage = {
            senderEmail: userData.email,
            receiverEmail:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.email !== tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
          }
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    const handleEmail=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"email": value});
    }

    const registerUser=()=>{
        connect();
    }
    return (
    <div className="container">
        {userData.connected?
        <div className="chat-box">
            <div className="member-list">
                <ul>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
                </ul>
            </div>
            {tab!=="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className={`message ${chat.senderEmail === userData.email && "self"}`} key={index}>
                            {chat.senderEmail !== userData.email && <div className="avatar">{chat.senderEmail}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.email && <div className="avatar self">{chat.senderEmail}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                </div>
            </div>}
        </div>
        :
        <div className="register">
            <input
                id="user-name"
                placeholder="Confirm your email"
                name="email"
                value={userData.email}
                onChange={handleEmail}
                margin="normal"
              />
              <br></br>
              <br></br>
              <button type="button" onClick={registerUser}>
                    start chatting
              </button> 
        </div>}
    </div>
    )
}