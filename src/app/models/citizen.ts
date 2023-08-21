export interface Citizen {
  id?: string
  name?: string
  surname?: string
  ssn?: string
  address?: Address
  email?: string

  // non aggiunte da carmine
  token?: string
  separationPerformance?: number
  taxesStatus?: boolean


}

interface Address {
  streetName?: string
  streetNumber?: string
  city?: string
  postalCode?: string
}

