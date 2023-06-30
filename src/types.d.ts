export interface ServerToClientEvents {
  ready: (a: string) => void
  userUpdate: (updatedUser: Omit<User, 'clientId'>) => void
  friendRequestCreate: (request: any)=> void
  friendRequestDelete: (request: any)=> void
  friendAdd: (friend: any) => void
  friendRemove: (friend: any) => void
}

export interface ClientToServerEvents {
  userUpdate: (updatedUser: Omit<User, 'clientId'>) => void
  friendRequestCreate: (request: any)=> void
  friendRequestDelete: (request: any)=> void
  friendAdd: (friend: any) => void
  friendRemove: (friend: any) => void
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export interface UserStatus {
  id: string
  userId: string
  type: 0 | 1 | 2 | 3 | 4
  emoji: string | null
  message: string | null
}

export interface User {
  id: string
  name: string | null
  email: string
  about: string | null
  friends: string[]
  color: string | null
  avatarUrl: string | null
  userName: string
  phoneNumber: string
  blockedUsers: string[]
  archivedChats: string[]
  createdAt: Date
  updatedAt: Date,
  status?: UserStatus
}