import styles from './styles.module.scss'
import { VscGithubInverted } from 'react-icons/vsc'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth';


export function LoginBox(){

    const {signInUrl} = useContext(AuthContext);
    const token = import.meta.env.GITHUB_CLIENT_ID
    console.log(token);
    return(
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href={signInUrl} className={styles.signInWithGithub}>
                <VscGithubInverted size={24}/> 
                Entrar com GitHub
            </a>
        </div>
    )
}