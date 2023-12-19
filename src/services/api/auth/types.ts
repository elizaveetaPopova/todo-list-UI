export interface ILoginRequest {
    email: string,
    password: string
}

export interface ILoginResponse {
    accessToken: string
}

export interface IRegisterRequest {
    email: string,
    password: string,
    firstName:string,
    lastName: string
}