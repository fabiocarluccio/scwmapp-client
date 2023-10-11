export interface Tax {
  id: string
  taxCode: string
  year: string
  amount: number
  expireDate: string
  paymentDate?: string
  receipt?: string
}
