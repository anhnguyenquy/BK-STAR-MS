import './style.scss'
import { useState } from 'react'
import { auth, firestore } from '../../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { collection, doc, query, where, getDocs, addDoc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { useForm } from '../../hooks'
import { addUsers } from '../../helpers'

export const HomePage = (props) => {
    const { setUID, setMemberID } = props
    const { formValue, changeFormValue } = useForm({ email: "", password: "" });
    const [employeeID, setEmployeeID] = useState()

    //Nếu login thành công thì setUID trong <App/> thành uid của user
    const login = async () => {
        const { email, password } = formValue
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
            setUID(response.user.uid)
        }
        catch (error) {
            alert(error.message)
        }
    }

    //set memberID trong <App/> thành user input
    const fetchEmployeeInfo = () => {
        if (employeeID != undefined && employeeID != null && employeeID != '') {
            setMemberID(employeeID)
        }
    }

    return (
        <div className='homePage'>
            <div className='appName'>BK-STAR-MS</div>
            <div className='credentialBox'>
                <div className="login">
                    <input type="text" placeholder="Email" spellCheck={false} onChange={(e) => { changeFormValue('email', e.target.value) }} />
                    <input type="password" placeholder="Password" onChange={(e) => { changeFormValue('password', e.target.value) }} />
                    <button onClick={login}>Login</button>
                </div>
                <div>--------- or ---------</div>
                <div className="getEmployeeInfo">
                    <input type="number" placeholder="Enter employee ID" onChange={(e) => setEmployeeID(e.target.value)} />
                    <button onClick={fetchEmployeeInfo}>Get Employee Info</button>
                </div>
            </div>
        </div>
    )
}