interface ITitle {
    required: string
}

interface IDescr {
    required: string
}

interface IText {
    required: string
}

interface ITag {
    required: boolean
}

export type IArticleFormFieldType = ITitle | IDescr | IText | ITag