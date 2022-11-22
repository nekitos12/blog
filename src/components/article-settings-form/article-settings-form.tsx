import React, { useEffect } from 'react'
import './article-settings-form.scss'
import { Button } from '@mui/material'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import InputForm from '../input-form'
import { IArticleFormFieldType } from '../../models/types/articleInputRules'
import { tagField } from '../../models/articleInputField'
import { IArticle } from '../../models/types/article'

interface IInputField {
  name: string
  label: string
  tag?: string
  placeholder?: string
  type: string
  rules: IArticleFormFieldType
}

export interface IArticleForm {
  title: string
  description: string
  body: string
  tags: Array<{ tag: string }>
}

interface IArticleSettingsFormProps {
  header: string
  inputField: Array<IInputField>
  onSuccessSubmit: SubmitHandler<IArticleForm>
  error?: string
  submitText: string
  article?: IArticle
  tagList?: string[]
}

export default function ArticleSettingsForm({
  tagList,
  submitText,
  error,
  onSuccessSubmit,
  inputField,
  header,
  article,
}: IArticleSettingsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<IArticleForm>({
    mode: 'onBlur',
    defaultValues: { tags: [{ tag: '' }, { tag: '' }] },
  })
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  })
  useEffect(() => {
    if (tagList) {
      reset({ tags: tagList.map(tag => ({ tag })) })
    }
  }, [tagList])

  const onSubmit: SubmitHandler<IArticleForm> = data => {
    reset()
    onSuccessSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='article-settings-form'>
      <>
        <header className='article-settings-form__header'>{header}</header>
        <ul className='article-settings-form__input-list'>
          {inputField.map(field => {
            return (
              <li key={field.name} className='article-settings-form__input-list-item'>
                <InputForm
                  errors={errors}
                  register={register}
                  {...field}
                  defaultValue={article?.[field.name] || ''}
                  cl={`article-settings-form__input ${
                    field.name === 'text' ? 'article-settings-form__input-text' : ''
                  }`}
                />
              </li>
            )
          })}
        </ul>
        <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '21px' }}>
          <ul className='article-settings-form__tag-list'>
            <div>Tags</div>
            {fields.map((field, i) => (
              <li key={field.id} className='article-settings-form__tag-list-item'>
                <InputForm
                  {...tagField}
                  name={`tags.${i}.tag`}
                  defaultValue={article?.tagList?.[i] || ''}
                  errors={errors}
                  register={register}
                  cl={'article-settings-form__tag-list-input'}
                />
                <Button
                  color='error'
                  className='article-settings-form__tag-list-btn'
                  variant='outlined'
                  onClick={() => remove(i)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
          <Button
            className='article-settings-form__tag-list-btn'
            sx={{ width: 'fit-content' }}
            color='info'
            variant='outlined'
            onClick={() => append({ tag: '' })}
          >
            Add tag
          </Button>
        </div>

        {error || null}
        <Button
          component='button'
          type='submit'
          variant='contained'
          color='primary'
          className='article-settings-form__submit'
          sx={{ width: '320px' }}
          disabled={!isValid}
        >
          {submitText}
        </Button>
      </>
    </form>
  )
}
