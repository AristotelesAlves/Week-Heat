// receber o code(string)
// recuperar o access_token no github  ( acesso aos dados do user )
// verificar se o user existe no DB 
// ----- SIM = gera um token
// ----- NÃO = cria no db, gera um token
// retornar o token com as infos do user

import axios from "axios"

interface IAccessTokenResponse{
    access_token: string
}

class AuthenticateUserService {
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token";

        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url,null,{
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            headers:{
                "Accept": "application/json"
            }
        });


        const response = await axios.get("https://api.github.com/user", {
        headers: {
            authorization: `Bearer ${accessTokenResponse.access_token}`
        }
    })

    return response.data;

    }
    
}

export { AuthenticateUserService }