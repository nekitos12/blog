import React from 'react'
import './article-full.scss'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ArticleFull({ text }: { text: string }) {
  return (
    <div className='article-full'>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  )
}
