import React from 'react'
import { useForm } from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { collection,addDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { auth } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'


interface CreateFormData {
    title:string;
    description:string;
}
const CreateForm = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth)
    const schema = yup.object().shape({
        title:yup.string().required('Title is required'),
        description:yup.string().required('Description is required')
    })

    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    })
    const onCreatePost = async(data:CreateFormData) => {
        try {
            const postsRef = await addDoc(collection(db,"posts"),{
                title: data.title,
                description:data.description,
                username:user?.displayName,
                userId:user?.uid,
            })
        } catch (e) {
            if (e instanceof Error) {
                console.log("Error adding Doc", e.message);
            } else {
                console.log("An error occurred while adding the document.");
            }
        }
        navigate("/")
    }
  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
        <input  placeholder='Title...' {...register('title')}/>
        <p style={{color:'red'}}>{errors.title?.message}</p>
        <textarea placeholder='Description...'{...register('description')}/>
        <p style={{color:'red'}}>{errors.description?.message}</p>
        <input type='submit'/>
    </form>
  )
}

export default CreateForm