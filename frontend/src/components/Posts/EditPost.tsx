import { Modal } from "@mui/material"
import { useEffect, useState } from "react"
import { RiCloseCircleLine, RiPencilFill } from "react-icons/ri"
import { EditPostProps, EditPostType } from "../../types/types"
import { api } from "../../services/api"
import { useParams } from "react-router-dom"

const EditPost:React.FC<EditPostProps> = ({postId}) => {
    const [open, setOpen] = useState(false)
    
    const token = localStorage.getItem('token')

    const {post_id} = useParams<{post_id: string}>()

    const [postData, setPostData] = useState<EditPostType>({
        post_id: postId,
        title: '',
        content: ''
    })

    useEffect(()=>{
        const fetchPostData = async () =>{
            try {
                const response = await api.get(`/post/${postId}`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                setPostData(response.data)
            } catch (error) {
                console.error('Erro: ', error)
            }
        }
        fetchPostData()
    }, [post_id])

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleUpdatePost = async() => {
        if (!postData) return

        try{
            const response = await api.post('/post/atualizar', postData,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)
            window.location.reload()
        }catch(error){
            console.error(error)
        }
    }
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        if (postData){
            setPostData({...postData, [name]:value})
        }
    }

  return(
    <>
        <button onClick={handleOpen} ><RiPencilFill color='var(--cor03)'/></button>
        <Modal open={open}>
          <div className='newpost-container'>
              <div className="newpost">
                <button className='btn-exit' onClick={handleClose}><RiCloseCircleLine/></button>
                <div className="post">
                    <h2>Editar Post</h2>
                    <input type="text" id='tittle' name="title" value={postData.title} onChange={handleInputChange}/>
                    <textarea id='content' name="content" value={postData.content} onChange={handleInputChange}/>
                    <div className="btn-post"><input type="button" value={'Salvar'} onClick={handleUpdatePost} /></div>
                </div>
              </div>
          </div>
      </Modal>      
    </>
  )
}

export default EditPost