import React,{useState, useEffect} from 'react';

import {GiftedChat} from 'react-native-gifted-chat';


export default function RoomScreen(){
    const [messages, setMessages] = useState([{
        _id:0,
        text:'New room created.',
        createdAt:new Date().getTime(),
        system:true
    },
    {
        _id:1,
        text:'Hello!',
        createdAt:new Date().getTime()
        user:{
            _id:2,
            name:'Test User'
        }
    }
]);
    function handleSend(){

    }
}