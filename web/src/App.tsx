
import styles from './app.module.scss';
import { LoginBox } from './components/LoginBox';
import { useContext } from 'react'
import { MessageList } from './components/MessageList';
import { AuthContext } from './contexts/auth';
import { SendMessageForm } from './components/SendMessageForm';


export function App() {

  const { user } = useContext(AuthContext);

  return (
    <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ' '}`}>
      <MessageList/>
      { !!user ? <SendMessageForm/> : <LoginBox/>}
    </main>
  )
}
