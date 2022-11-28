interface IEmail {
  required: string | boolean
}

interface IUsername {
  required: string | boolean
  min: number
  max: number
}

interface IPassword {
  min: number
  max: number
}
interface IConfirmPassword {
  required: boolean | string
  validate: null | ((val: string) => string)
}

interface IAvatar {
  required: string | boolean
}

export type IUserFormFieldType = IEmail | IUsername | IPassword | IConfirmPassword | IAvatar
