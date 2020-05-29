export interface Users {
  content: UserContent[]
  totalPages?: number
  totalElements?: number
}

export interface UserContent {
  id: number
  firstName: string
  lastName: string
  email: string
  gender: string
  totalClicks: number
  totalPageViews: number
  ipAddress: string
}

