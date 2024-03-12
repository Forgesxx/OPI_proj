import React, { useState, useContext, useEffect } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useMovieContext } from '../../../context/MovieContex/MovieContex'
import { AuthContext } from '../../../context/AuthContext/AuthContext'
import { collection, deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../../context/AuthContext/Firebase'
import { useCollectionData } from "react-firebase-hooks/firestore"
import { message } from 'antd'

function ActorsLike({ data, likedOrNot }) {
    const { currentUser } = useContext(AuthContext)
    const { likeMovieDispatch } = useMovieContext()

    const [removeLike, setRemoveLike] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()

    const query = collection(db, `likes/${currentUser?.uid}/children`)
    const [docs] = useCollectionData(query)
    const like = async (e) => {
        if (currentUser !== null) {
            setRemoveLike(true)
            const docRef = doc(db, `likes/${currentUser?.uid}/children`, e.name)
            await setDoc(docRef, {
                c_id: e.id,
                c_name: e.name,
                c_media_type: "actor",
                c_poster_path: e.profile_path,
                timestamp: serverTimestamp()
            });
        } else {
            messageApi.open({
                type: "error",
                content: "You not user! Register now!",
                duration: 4
            })
        }
    }

    const deleteLike = async (e) => {
        setRemoveLike(false)
        const newName = `${e.title == undefined ? e.name : e.title}`
        const docRef = doc(db, `likes/${currentUser?.uid}/children`, newName)
        await deleteDoc(docRef);
    }

    useEffect(() => {
        if (likedOrNot !== undefined) {
            setRemoveLike(true)
        }
        else {
            setRemoveLike(false)
        }
    }, [setRemoveLike])

    // UPDATING LIKED MOVIES
    useEffect(() => {
        likeMovieDispatch({
            type: "LIKE",
            newLocalMovie: docs
        });
    }, [docs])

    return (
        <>
            {contextHolder}
            {removeLike ?
                <div className='icon' onClick={() => deleteLike(data)}>
                    <AiFillHeart className='events' />
                </div>
                :
                <div className='icon' onClick={() => like(data)}>
                    <AiOutlineHeart className='events' />
                </div>
            }
        </>
    )
}

export default ActorsLike