export type User={
    _id?: number
    name: string
    username: string
    birthdate: string
    email: string
    password: string
    gender: string
}

export type UserEdit={
    name: string
    username: string
    birthdate: string
    email: string
    gender: string
}

export type PostType={
    user_id: number
    post_id: number
    title: string
    content: string
    liked: boolean
    likes: number
}

export type ContentProps={
    content: string;
    limit?: number;
  }