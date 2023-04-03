import type { Action, Position, Section, Status } from "./enums"

export interface Member {
    id: string
    user: User
    position: Position
    rate: number
    frequency: 'hourly' | 'per video'
    permissions: Permission
}

export interface Team {
    id: string
    members: Member[]
    customerid: string
    subscription: string
    sub_frequency: string
    channel_count: number
    video_count: number
    member_count: number
}

export interface User {
    id: string
    firstname: string
    lastname: string
    email: string
    image: string
    confirmed_at: string
}

export type Permission = {
    [key in Section]?: Action[]
}

export interface Channel {
    id: string
    name: string
    videos: Video[]
    teamid: string
}

export interface Video {
    id: string
    teamid: string
    channelId: string
    channel: Channel
    status: Status
    title: string
    created_at: Date
    publishedAt?: Date
    scriptLink: string
    voiceOverLink: string
    videoLink: string
    youtubeVideoLink: string
    thumbnailLink: string
    notes: string
    works: Work[]
}

export interface Work {
    id: string
    created_at: Date
    memberid: string
    member: Member
    loggedhours: number
    videoid: string
    video?: Video
    finished_at: Date
}

export interface Blog {
    id: string
    image: string
    title: string
    slug:string
    description: string
    created_at: Date
    categories: string[]
    readingtime: number
    content: string
}
