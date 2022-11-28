interface ITitle {
  required: string | boolean
}

interface IDescr {
  required: string | boolean
}

interface IText {
  required: string | boolean
}

interface ITag {
  required: string | boolean
}

export type IArticleFormFieldType = ITitle | IDescr | IText | ITag
