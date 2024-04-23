export interface GoogleAuth {
    access_token: string,
    authuser: string,
    expires_in: number, 
    prompt: string,
    scope: string,
    token_type: string
}

export interface GoogleProfile {
    email: string,
    family_name: string,
    given_name: string,
    id: string,
    locale: string,
    name: string,
    picture: string,
    verified_email: boolean, 
}