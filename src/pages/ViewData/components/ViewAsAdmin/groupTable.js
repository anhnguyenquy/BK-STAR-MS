import { useState, useEffect } from 'react'
import { auth, firestore } from '../../../../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, query, where, getDocs, addDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { Table } from '../../../../components'
import { tableNames } from './tableNames'
import { EditableText, EditableTextArea } from '../../../../components'

export const GroupTable = (props) => {
    const { userData, setUserData } = props
    const updateData = async (fieldName, newValue, id) => {
        if (newValue != undefined && newValue != null) {
            const docRef = doc(firestore, 'humans', id)
            const response = await updateDoc(docRef, {
                [fieldName]: newValue
            })
            let newUserData = userData
            userData.forEach(doc => {
                if (doc.id == id) {
                    doc[`${fieldName}`] = newValue
                }
            })
            setUserData(newUserData)
        }
    }
    const del = async (id) => {
        const docRef = doc(firestore, 'humans', id)
        await deleteDoc(docRef);
        const newUserData = userData.filter(doc => {
            return (doc.id !== id)
        })
        setUserData(newUserData)
    }
    return (
        <Table
            columns={[
                {
                    name: 'Name',
                    width: '11%',
                    render: (user) => {
                        return (
                            <EditableText defaultValue={user.name} onUpdate={(newValue) => { updateData('name', newValue, user.id) }} />
                        )
                    }
                },
                {
                    name: 'ID',
                    width: '11%',
                    render: (user) => {
                        return (
                            <EditableText defaultValue={user.employeeID} onUpdate={(newValue) => { updateData('employeeID', newValue, user.id) }} />
                        )
                    }
                },
                {
                    name: 'Gender',
                    width: '11%',
                    render: (user) => {
                        return (
                            <EditableText defaultValue={user.gender} onUpdate={(newValue) => { updateData('gender', newValue, user.id) }} />
                        )
                    }
                },
                {
                    name: 'Group',
                    width: '11%',
                    render: (user) => {
                        return (
                            <EditableText defaultValue={user.group} onUpdate={(newValue) => { updateData('group', newValue, user.id) }} />
                        )
                    }
                },
                {
                    name: 'Role',
                    width: '11%',
                    render: (user) => {
                        return (
                            <EditableText defaultValue={user.role} onUpdate={(newValue) => { updateData('role', newValue, user.id) }} />
                        )
                    }
                },
                {
                    name: 'Salary',
                    width: '11%',
                    render: (user) => {
                        return (
                            <EditableText defaultValue={user.salary} onUpdate={(newValue) => { updateData('salary', newValue, user.id) }} />
                        )
                    }
                },
                {
                    name: 'So Cong Lam Viec',
                    width: '11%',
                    render: (user) => {
                        return (
                            <EditableText defaultValue={user.soCongLamViec} onUpdate={(newValue) => { updateData('soCongLamViec', newValue, user.id) }} />
                        )
                    }
                },
                {
                    name: 'Working Days Per Month',
                    width: '11%',
                    render: (user) => {
                        return (
                            <EditableText defaultValue={user.workingDaysPerMonth} onUpdate={(newValue) => { updateData('workingDaysPerMonth', newValue, user.id) }} />
                        )
                    }
                },
                {
                    name: 'Year Of Birth',
                    width: '11%',
                    render: (user) => {
                        return (
                            <EditableText defaultValue={user.yearOfBirth} onUpdate={(newValue) => { updateData('yearOfBirth', newValue, user.id) }} />
                        )
                    }
                },
                {
                    type: "action",
                    width: '1%',
                    render: (user) => {
                        return (
                            <button className="removeUserButton" onClick={() => { del(user.id) }}>
                                <i className="fas fa-times"></i>
                            </button>
                        )
                    }
                }
            ]}
            dataSource={userData}
            names={tableNames}
            showActions={true}
        />  
    )
}