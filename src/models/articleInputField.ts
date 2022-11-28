export const titleField = {
  label: 'Title',
  name: 'title',
  type: 'text',
  rules: {
    required: 'Поле обязательное для заполнения',
  },
}

export const descrField = {
  label: 'Short description',
  name: 'description',
  type: 'text',
  placeholder: 'Title',
  rules: {
    required: false,
  },
}

export const bodyField = {
  label: 'Text',
  name: 'body',
  type: 'text',
  tag: 'textarea',
  rules: {
    required: 'Поле обязательное для заполнения',
  },
}

export const tagField = {
  name: 'tag',
  type: 'text',
  placeholder: 'Tag',
  rules: {
    required: false,
  },
}
