interface IEmail {
    required: string
}

interface IUsername {
    required: string
    min: number
    max: number
}

interface IPassword {
    min: number
    max: number
}
interface IConfirmPassword  {
    required: boolean | string
    validate: null | ((val: string)=> string )
}

interface IAvatar {
    required: string
}

export type IUserFormFieldType = IEmail | IUsername | IPassword | IConfirmPassword | IAvatar