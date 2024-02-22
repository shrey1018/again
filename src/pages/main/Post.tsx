import React, { useEffect, useState } from 'react'
import { PostData } from './main';
import { addDoc, collection, getDocs,query, where,deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Props{
    post:PostData;
}
interface Like{
    userId:string;
    likeId:string;
}



const Post = (props:Props) => {
    const {post} = props;
    const likesRef = collection(db,'likes');
    const likesDoc = query(likesRef,where ("postId","==",post.id))
    const [user] = useAuthState(auth);
    const [likes,setLikes] = useState<Like[] | null>(null);

    const getLikes = async()=>{
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc)=>({
            userId:doc.data().userId, likeId:doc.data().likeId})));
    }

    const hasUserLiked = likes?.find((like)=> like.userId===user?.uid)

    const addLike = async() => {
        try{
            const newDoc = await addDoc(likesRef,{userId:user?.uid,postId:post.id})
            if (user){
             setLikes((prev)=>
            prev?[...prev,{userId:user.uid,likeId:newDoc.id}]:[{userId:user.uid,likeId:newDoc.id}])
            }
        }catch(err){
            console.log(err);
        }
          
           
    }

    const removeLike = async() => {
        try{
            const likeToDeleteQuery = query(
                likesRef,
                where("postId","==",post.id),
                where("userId","==",user?.uid)
            )
            const likeToDeleteData= await getDocs(likeToDeleteQuery)
            const likeId = likeToDeleteData.docs[0].id; // Define likeId here
            const likeToDelete = doc(db,"likes",likeId)
            await deleteDoc(likeToDelete)
            if (user){
                setLikes((prev)=>prev && prev.filter((like)=>like.likeId  !== likeId)) // Use likeId here
            }
        }catch(err){
            console.log(err);
        }
    }




    useEffect (()=>{
        getLikes();
    },[])


  return (
    <div>
        <div className='title'>
        <h1>{post.title}</h1>
        </div>
        <div className='body'>
        <p>{post.description}</p>
        </div>
        <div className='footer'>
            <p>@{post.username}</p>
        </div>
        <button onClick={hasUserLiked?removeLike:addLike}>{hasUserLiked?<>👎</>:<>👍🏻</>}</button> 
        {likes && <p>Likes: {likes?.length}</p>}

    </div>
  )
}

export default Post