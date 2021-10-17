import './style.scss'
import { auth, firestore } from '../../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, query, where, getDocs, addDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { ViewAsMember, ViewAsAdmin, ViewAsCaptain } from './components'

export const ViewData = (props) => {
    const { uid, memberID } = props
    const [accountType, setAccountType] = useState('')
    useEffect(async () => {
        if (uid != '') {
            const q = query(collection(firestore, 'humans'), where('uid', '==', uid));
            const querySnapshot = await getDocs(q);
            const fetchedUserData = querySnapshot.docs[0].data()
            setAccountType(fetchedUserData.role)
        }
        else {
            setAccountType('member')
        }
    }, [])
    return (
        <div className='viewData'>
            {
                accountType != '' ?
                    accountType == 'member' ?
                        <ViewAsMember memberID={memberID} />
                        :
                        accountType == 'admin' ? <ViewAsAdmin /> : <ViewAsCaptain uid={uid} />
                    :
                    <></>
            }
        </div>
    )
}