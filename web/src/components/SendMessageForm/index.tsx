import { VscGithub, VscSignOut } from 'react-icons/vsc';
import style from './styles.module.scss';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { api } from '../../services/api';

export function SendMessageForm(){

    const { user, signOut } = useContext(AuthContext);
    const [message, setMessage] = useState("");


    async function handleSendMessage(e: FormEvent) {
        e.preventDefault();
        if (!message.trim()) {
            return;
        }
        await api.post('/messages', { message } )

        setMessage('');
    }

    return(
        <div className={style.sendMessageFromWrapper}>

            <button onClick={signOut} className={style.signOutButtom}>
                <VscSignOut size={32}/>
            </button>

            <header className={style.userInformation}>
                <figure className={style.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </figure>
                <strong className={style.userName}>
                    {user?.name}
                </strong>
                <span className={style.userGithub}>
                    <VscGithub size={16}/>
                    {user?.login}
                </span>
                
            </header>

            <form onSubmit={handleSendMessage} className={style.sendMessageForm}>
                <label htmlFor="message">
                    Mensagem
                </label>
                <textarea 
                  name="message" 
                  id="message" 
                  placeholder="Qual sua expectativa para o evento?"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  />
                  <button type="submit">Enviar mensagem</button>
            </form>

        </div>
    )
}