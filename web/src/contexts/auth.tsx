import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";



interface IAuthProvider{
    children: ReactNode;
}

interface IUser{
    id: string;
    name: string;
    login: string;
    avatar_url: string;
}

interface IAuthContextData{
    user: IUser | null;
    signInUrl: string;
    signOut: () => void;
}

type IAuthResponse = {
    token: string;
    user: {
        id: string;
        name: string;
        avatar_url: string;
        login: string;
    }
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider(props: IAuthProvider){

    const [user, setUser] = useState<IUser | null>(null);
    
    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=2462562e148b3375e188`;
    async function signIn(githubCode: string){
        const response = await api.post<IAuthResponse>('/authenticate',{
            code: githubCode,
        }) // enviando o token gerado pelo signInUrl
        const { token, user } = response.data // separando o token das informação do usuário
        localStorage.setItem('@dowhile:token', token) //salvando token no navegador
        api.defaults.headers.common.Authorization = `Bearer ${token}`
        setUser(user)
    }

    function signOut(){ //deslogando
        setUser(null)
        localStorage.removeItem('@dowhile:token')
    }

    useEffect(() => {
        const token = localStorage.getItem('@dowhile:token'); // pega o token salvo no navegador
        if (token){
            
            api.defaults.headers.common.Authorization = `Bearer ${token}` // Passando o token no cabecario

            api.get<IUser>('profile').then(response => {
                setUser(response.data)
            })
        }
    }, [])

    useEffect(() => {
        const url = window.location.href; // capturando url
        const hasGithubCode = url.includes('?code='); // verificando se o token ta presente na url
        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split('?code=') // separando url do token 
            window.history.pushState({}, '', urlWithoutCode) //tirando o code da url
            signIn(githubCode)
        }
        
    },[])

    return (
        <AuthContext.Provider value={{signInUrl, user, signOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}