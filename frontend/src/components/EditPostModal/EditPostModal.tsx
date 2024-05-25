import './EditPostModal.css'
import { Modal } from "@mui/material"
import { useState } from "react"
import { RiCloseCircleLine, RiPencilFill } from "react-icons/ri"
import { PostEdit } from '../../types/types'

const EditPostModal: React.FC<PostEdit> = () => {
    const [open, setOpen] = useState(false)
    //const [title, setTitle] = useState('')
    //const [content, setContent] = useState('')

    const handleOpen = async () => {
        setOpen(true)
    }

    const handleClose = () => setOpen(false)

    return (
        <div>
            <button className="btn-edit-post" onClick={handleOpen}><RiPencilFill color='var(--cor03)'/></button>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <>
                    <div className='newpost-container'>
                        <div className="newpost">
                            <button className='btn-exit' onClick={handleClose}><RiCloseCircleLine /></button>
                            <div className="post">
                                <h2>Atualizar Post</h2>
                                <input type="text" id='tittle' placeholder='Título'/>
                                <textarea id='content' placeholder='Conteúdo'/>
                                <div className="btn-post"><input type="button" value={'Salvar'}/></div>
                            </div>
                        </div>
                    </div>
                </>
            </Modal>
        </div>
    )
}

export default EditPostModal
