export type User={
    id?: string
    name: string
    birthdate: string
    email: string
    password: string
    gender: string
    acess_token?: string
}

export interface ContextType extends User {
    authenticate: (email: string, password: string) => Promise<void>;
    logout: () => void;
    getUserInfo: (token:string) => Promise<any>;
}

export interface AuthProviderType {
    children: JSX.Element;
}