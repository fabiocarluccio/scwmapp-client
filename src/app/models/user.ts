export interface User {
  id?: string
  username: string
  email: string
  password: string
  role: string
  passwordResetToken?: string
  // il ? serve per rendere opzionale un certo campo. Se non viene messo il ? allora
  // è obbligatorio fornire quell'attributo durante l'inizializzazione dell'oggetto.

}
