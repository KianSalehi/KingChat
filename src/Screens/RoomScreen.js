import React,{useState, useEffect, useContext} from 'react';
import {IconButton} from 'react-native-paper';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {GiftedChat, Bubble, Send, SystemMessage} from 'react-native-gifted-chat';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

export default function RoomScreen({ route }){
    const {thread} = route.params;
    const {user} = useContext(AuthContext);
    const currentUser = user.toJSON();
    const [messages, setMessages] = useState([{
        _id:0,
        text:'New room created.',
        createdAt:new Date().getTime(),
        system:true
    },
    {
        _id:1,
        text:'Hello!',
        createdAt:new Date().getTime(),
        user:{
            _id:2,
            name:'Test User'
        }
    }
]);

    useEffect(()=>{
        const messagesListener = firestore()
        .collection('THREADS')
        .doc(thread._id)
        .collection('MESSAGES')
        .orderBy('createdAt', 'desc')
        .onSnapshot(querySnapshot=>{
            const messages = querySnapshot.docs.map(doc=>{
                const firebaseData = doc.data();
                
                const data = {
                    _id: doc.id,
                    text:'',
                    createdAt: new Date().getTime(),
                    ...firebaseData
                };

                if (!firebaseData.system){
                    data.user={
                        ...firebaseData.user,
                        name:firebaseData.user.email
                    };
                }

                return data;
            });

            setMessages(messages);
        });
        return () => messagesListener();
    }, []);


//Helper Message bubbles function
    function renderBubble(props){
        return (
            <Bubble
            {...props}
            wrapperStyle={{
                right:{
                    backgroundColor:'#6646ee'
                },
                left:{
                    backgroundColor:'#ffffff'
                }
            }}
            textStyle={{
                right:{
                    color:'#fff'
                }
            }}
            />
        );
    }
    //Helper Send button function
    function renderSend(props){
        return(
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <IconButton icon='send-circle' size={32} color='#6646ee'/>
                </View>
            </Send>
        );
    }
    //Helper function for scrolling through messages
    function scrollToBottomComponent(){
        return(
            <View style={styles.bottomComponentContainer}>
                <IconButton icon='chevron-double-down' size={36} color='#6646ee'/>
            </View>
        );
    }
    //helper Loading function
    function renderLoading(){
        return(
            <View style={styles.loadingContainer}>
                <ActivityIndicator size ='large' color='#6646ee'/>
            </View>
        );
    }
    //helper rendering system message
    function renderSystemMessage(props){
        return(
            <SystemMessage
                {...props}
                wrapperStyle={styles.systemMessageWrapper}
                textStyle={styles.systemMessageText}
            />
        )
    }
//Helper send message function
    async function handleSend(messages){
        const text = messages[0].text;

        firestore()
        .collection('THREADS')
        .doc(thread._id)
        .collection('MESSAGES')
        .add({
            text,
            createdAt: new Date().getTime(),
            user:{
                _id: currentUser.uid,
                email:currentUser.email
            }
        });
        await firestore()
        .collection('THREADS')
        .doc(thread._id)
        .set(
            {
                latestMessage:{
                    text,
                    createdAt:new Date().getTime()
                }
            },
            {merge:true}
        );
    }

    return (
        <GiftedChat
        messages={messages}
        onSend = {handleSend}
        user={{_id: currentUser.uid}}
        renderBubble={renderBubble}
        placeholder='Type your message here'
        showUserAvatar
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderLoading={renderLoading}
        renderSystemMessage={renderSystemMessage}
        />
    );

}

const styles=StyleSheet.create({
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      bottomComponentContainer:{
          justifyContent:'center',
          alignItems:'center'
      },
      loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      systemMessageText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold'
      },
      systemMessageWrapper: {
        backgroundColor: '#6646ee',
        borderRadius: 4,
        padding: 5
      },
})