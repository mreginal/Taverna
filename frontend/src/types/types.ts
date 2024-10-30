export type User={
    _id?: number
    name: string
    birthdate: string
    email: string
    password: string
    gender: string
    profile_picture: string
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
    favorited : boolean
    comments: number
}

export type EditPostType={
    post_id : number
    title: string
    content: string
}

export type EditPostProps={
    postId: number
}

export type ContentProps={
    content: string
    limit: number
}

export type UserPostProps={
    posts: PostType
}


export type Notification={
    _id: number;
    user_id: number;
    type: string;
    title: string;
    message: string;
    post_id?: string;
    sender_id: number;
}
