import { useState, useEffect } from 'react'
import { auth, firestore } from '../../../../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, query, where, getDocs, addDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { GroupTable } from './groupTable'
import { tableNames } from './tableNames'
import './style.scss'

export const ViewAsAdmin = () => {
    const [userData, setUserData] = useState()
    const addUser = async () => {
        const newDocData = {
            name: '',
            gender: '',
            group: '',
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
    useEffect(async () => {
        const q = query(collection(firestore, 'humans'));
        const querySnapshot = await getDocs(q);
        const fetchedUserData = querySnapshot.docs
        const docs = []
        fetchedUserData.forEach(doc => {
            let newDocData = doc.data()
            newDocData = { ...newDocData, id: doc.id }
            docs.push(newDocData)
        })
        const adminDocs = docs.filter(doc => doc.role == 'admin')
        const captainDocs = docs.filter(doc => doc.role == 'captain')
        const captainWebDocs = captainDocs.filter(doc => doc.group == 'web')
        const captainElectronicsDocs = captainDocs.filter(doc => doc.group == 'electronics')
        const captainMechanicsDocs = captainDocs.filter(doc => doc.group == 'mechanics')
        const memberDocs = docs.filter(doc => doc.role != 'captain')
        const memberWebDocs = memberDocs.filter(doc => doc.group == 'web')
        const memberElectronicsDocs = memberDocs.filter(doc => doc.group == 'electronics')
        const memberMechanicsDocs = memberDocs.filter(doc => doc.group == 'mechanics')
        const sortedDocs = adminDocs.concat(captainWebDocs, captainElectronicsDocs, captainMechanicsDocs, memberWebDocs, memberElectronicsDocs, memberMechanicsDocs)
        const sortedDocsCopy = sortedDocs
        docs.forEach(doc => {
            if (!sortedDocs.includes(doc)) {
                sortedDocsCopy.push(doc)
            }
        })
        setUserData(sortedDocsCopy)
    }, [])
    return (
        <div className='viewAsAdmin'>
            <div className="adminTitle">Admin</div>
            {
                userData != undefined ?
                    <>
                        <GroupTable userData={userData} setUserData={setUserData} />
                        <button className='addUserButtonInAdminTable' onClick={addUser}>+</button>
                    </>
                    :
                    <></>
            }
        </div>
    )
}