export type User={
    _id: number
    name: string
    birthdate: string
    email: string
    password: string
    gender: string
}

export type UserEdit={
    name: string
    birthdate: string
    email: string
    gender: string
}

export type PostType={
    user_id: number
    _id: number
    title: string
    content: string
    liked: boolean
    likes: number
}