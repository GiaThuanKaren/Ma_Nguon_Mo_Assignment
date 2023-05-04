export interface CreatePostModel {
  title: string
  body: string
  cover_image: string
  userId: string
}



export interface PostItemInf {
  _id: Id
  title: string
  published: boolean
  body: string
  comments_count: number
  likes: any[]
  bookmarks: any[]
  created_at: CreatedAt
  edited_at: any
  cover_image: string
  user: User[]
  optionAdmin?: boolean
}

export interface Id {
  $oid: string
}

export interface CreatedAt {
  $date: string
}

export interface User {
  _id: Id2
  email: string
  emailVerified: any
  image: string
  name: string
}

export interface Id2 {
  $oid: string
}



export interface CommentInf {
  _id: Id
  author: Author[]
  body: string
  date: Date
  isPositive: boolean
  likes: any[]
  parent_id: string
  parent_post: ParentPost
  replies: any[]
}

export interface Id {
  $oid: string
}

export interface Author {
  _id: Id2
  email: string
  emailVerified: any
  image: string
  name: string
}


export interface Date {
  $date: string
}

export interface ParentPost {
  $oid: string
}
