export interface HResponse {
  statusCode: number
  body: string
  headers?: {
    [key: string]: string
  }
}

export interface HRequest {
  url: string
  method: string
  params: {
    [key: string]: string
  }
  query: {
    [key: string]: string
  },
  headers: {
    [key: string]: string
  }
}
