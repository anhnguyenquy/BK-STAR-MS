import { useState, useEffect } from 'react'
import { auth, firestore } from '../../../../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, query, where, getDocs, addDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { Table } from '../../../../components'
import { tableNames } from './tableNames'
import { EditableText, EditableTextArea } from '../../../../components'
import { GroupTable } from './groupTable'
import './style.scss'


export const ViewAsCaptain = (props) => {
    const { uid } = props
    const [group, setGroup] = useState('')
    const [userData, setUserData] = useState()

    //add user vào nhóm
    const addUser = async () => {
        const newDocData = {
            name: '',
            gender: '',
            group: group,
            role: 'member',
            salary: '',
            soCongLamViec: '',
            employeeID: '',
            workingDaysPerMonth: '',
            yearOfBirth: ''
        }
        const docRef = await addDoc(collection(firestore, "humans"), newDocData);
        const newDoc = {...newDocData, id: docRef.id}
        setUserData([...userData, newDoc])
    }

    //lúc component đc render thì check uid xem đag là trưởng nhóm nào
    useEffect(() => {
        if (uid == process.env.REACT_APP_WEB_CAPTAIN_UID) {
            setGroup('web')
        }
        else if (uid == process.env.REACT_APP_MECHANICS_CAPTAIN_UID) {
            setGroup('mechanics')
        }
        else {
            setGroup('electronics')
        }
    }, [])

    //sau khi check nhóm xong thì lấy dữ liệu các user trong nhóm đó
    useEffect(async () => {
        if (group != '') {
            const q = query(collection(firestore, 'humans'), where('group', '==', group));
            const querySnapshot = await getDocs(q);
            const fetchedUserData = querySnapshot.docs
            const docs = []
            fetchedUserData.forEach(doc => {
                let newDocData = doc.data()
                newDocData = { ...newDocData, id: doc.id }
                docs.push(newDocData)
            })
            const memberDocs = docs.filter(doc => doc.role != 'captain')
            const captainDocs = docs.filter(doc => doc.role == 'captain')
            memberDocs.forEach(doc => {
                captainDocs.push(doc)
            })
            setUserData(captainDocs)
        }
    }, [group])
    return (
        <div className='viewAsCaptain'>
            <div className="teamName">Team: {group}</div>
            {
                userData != undefined ?
                    <>
                        <GroupTable userData={userData} setUserData={setUserData} />
                        <button className='addUserButton' onClick={addUser}>+</button>
                    </>
                    :
                    <></>
            }
        </div>
    )
}