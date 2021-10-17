import { useState, useEffect } from 'react'
import { auth, firestore } from '../../../../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, query, where, getDocs, addDoc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { Table } from '../../../../components'
import { tableNames } from './tableNames'
import { EditableText } from '../../../../components'
import './style.scss'

export const ViewAsMember = (props) => {
    const { memberID } = props
    const [userData, setUserData] = useState([])
    useEffect(async () => {
        const q = query(collection(firestore, 'humans'), where('employeeID', '==', memberID.toString()));
        const querySnapshot = await getDocs(q);
        const fetchedUserData = querySnapshot.docs[0].data()
        setUserData([fetchedUserData])
    }, [])
    return (
        <div className='viewAsMember'>
            <Table
                columns={[
                    {
                        name: 'Name',
                        width: '11.11%', //width of each column
                        render: (user) => {
                            return (
                                <div>{user.name}</div>
                            )
                        }
                    },
                    {
                        name: 'ID',
                        width: '11.11%', //width of each column
                        render: (user) => {
                            return (
                                <div>{user.employeeID}</div>
                            )
                        }
                    },
                    {
                        name: 'Gender',
                        width: '11.11%', //width of each column
                        render: (user) => {
                            return (
                                <div>{user.gender}</div>
                            )
                        }
                    },
                    {
                        name: 'Group',
                        width: '11.11%', //width of each column
                        render: (user) => {
                            return (
                                <div>{user.group}</div>
                            )
                        }
                    },
                    {
                        name: 'Role',
                        width: '11.11%', //width of each column
                        render: (user) => {
                            return (
                                <div>{user.role}</div>
                            )
                        }
                    },
                    {
                        name: 'Salary',
                        width: '11.11%', //width of each column
                        render: (user) => {
                            return (
                                <div>{user.salary}</div>
                            )
                        }
                    },
                    {
                        name: 'So Cong Lam Viec',
                        width: '11.11%', //width of each column
                        render: (user) => {
                            return (
                                <div>{user.soCongLamViec}</div>
                            )
                        }
                    },
                    {
                        name: 'Working Days Per Month',
                        width: '11.11%', //width of each column
                        render: (user) => {
                            return (
                                <div>{user.workingDaysPerMonth}</div>
                            )
                        }
                    },
                    {
                        name: 'Year Of Birth',
                        width: '11.11%', //width of each column
                        render: (user) => {
                            return (
                                <div>{user.yearOfBirth}</div>
                            )
                        }
                    },
                ]}
                dataSource={userData}
                names={tableNames}
                showActions={false}
            />
        </div>
    )
}