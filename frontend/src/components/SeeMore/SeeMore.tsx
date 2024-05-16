import './SeeMore.css'
import { useState } from 'react'
import { ContentProps } from '../../types/types';

const Content: React.FC<ContentProps> = ({ content, limit }) => {
  const [seeMore, setSeeMore] = useState(false)

  const handleSeeMore = () => {
    setSeeMore(!seeMore)
  }

  return (
    <div>
      <p>{seeMore ? content : content.slice(0, limit)}</p>
      {content.length > limit && (
        <button className='more-btn' onClick={handleSeeMore}>
          {seeMore ? 'Ver menos' : 'Ver mais'}
        </button>
      )}
    </div>
  )
}

export default Content
