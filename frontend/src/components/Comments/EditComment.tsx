import './Comments.css'
import { Modal } from "@mui/material"
import { useEffect, useState } from "react"
import { RiCloseCircleLine, RiPencilFill } from "react-icons/ri"
import { EditPostProps, EditPostType } from "../../types/types"
import { api } from "../../services/api"
import { useParams } from "react-router-dom"

const EditComment:React.FC= () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

  return(
    <>
        <button onClick={handleOpen} className='edit-comment-btn'><RiPencilFill color='var(--cor03)'/></button>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <div className='newpost-container'>
                <div className="newpost">
                    <button className='btn-exit' onClick={handleClose}><RiCloseCircleLine/></button>
                    
                </div>
          </div>
      </Modal>      
    </>
  )
}

export default EditComment