import React, { useState } from 'react'
import { ContentProps } from '../../types/types'
import './Post.css'

const Content: React.FC<ContentProps> = ({ content, limit }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const displayContent = isExpanded || !limit ? content : content.slice(0, limit)
  const paragraphs = displayContent.split('\n')

  const handleMore = () => {
    setIsExpanded(true)
  }

  const handleLess = () =>{
    setIsExpanded(false)
  }

  return (
    <div>
        <div className='container-content'>
            <div className='content'>
            {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p> // Renderiza cada parágrafo
          ))}
          {limit && content.length > limit && (
            !isExpanded ? (
              <button className='btn-see' onClick={handleMore}>
                Ver Mais
              </button>
            ) : (
              <button className='btn-see' onClick={handleLess}>
                Ver Menos
              </button>
            )
          )}
            </div>
          </div>
    </div>
  )
}

export default Content
