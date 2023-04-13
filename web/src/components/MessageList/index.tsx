import styles from './styles.module.scss';
import logoImg from '../../assets/logo.svg';
import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

socket.on('new_message', (newMessage : IMessageUser) => {
    messageQueue.push(newMessage);
})

const messageQueue: IMessageUser[]= [];

interface IMessageUser{
    id: string;
    text: string;
    user:{
        name: string;
        avatar_url: string;
    }
}

export function MessageList(){

    const [message, setMessage] = useState<IMessageUser[]>([])

    useEffect(() => {
        const time = setInterval(() => {
            if (messageQueue.length > 0) {
                setMessage(prevState => [
                    messageQueue[0],
                    prevState[0],
                    prevState[1] ,
                ].filter(Boolean))

                messageQueue.shift()
            }
        },3000)
    })

    useEffect(() => {
        api.get<IMessageUser[]>('/messages/last3').then(response => {
            setMessage(response.data)
        })
    }, []);


    return(
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="Dowhile 2021" />
            <ul className={styles.messageLit}>
                {message.map(message => {
                    return (
                        <li key={message.id} className={styles.message}>
                            <p className={styles.messageContent}>
                                {message.text}
                            </p>
                            <div className={styles.messageUser}>
                                <div className={styles.userImage}>
                                    <img src={message.user.avatar_url} alt={message.user.name} />
                                </div>
                                <span>{message.user.name}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}