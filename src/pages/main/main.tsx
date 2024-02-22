import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase';
import Post from './Post';

export interface PostData{
    id:string;
    title:string;
    description:string;
    userId:string;
    username:string;
}


const Main = () => {
    const [postsList,setPostsList] = useState<PostData[] | null>(null)
    const postsRef = collection(db,'posts');

    const getPosts = async () => {
        const data = await getDocs(postsRef);
       setPostsList(data.docs.map((doc)=>({
            ...doc.data(),
            id: doc.id,
            
        }) as PostData))
    }

    useEffect(() => {
        getPosts();
    }, []); 
  return (
    
    <div>
            {postsList?.map((post) => (
                <Post post={post} />
            ))}
        </div>
  )
}

export default Main