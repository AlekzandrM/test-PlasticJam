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

export interface Statistics {
  chart: StatisticsItem[]
}
export interface StatisticsItem {
  id: number
  page_views: number
  date: string
  clicks: number
  userId: number
}

export interface Filter {
  from: Date
  to: Date
}
