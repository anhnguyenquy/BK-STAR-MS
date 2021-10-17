import { auth, firestore } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { collection, doc, query, where, getDocs, addDoc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { uniqueNamesGenerator, names } from 'unique-names-generator';
export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
export const credentials = [
    { email: 'user01@bk-star-ms.netlify.app', password: 'user01', employeeID: '000001' },
    { email: 'user02@bk-star-ms.netlify.app', password: 'user02', employeeID: '000002' },
    { email: 'user03@bk-star-ms.netlify.app', password: 'user03', employeeID: '000003' },
    { email: 'user04@bk-star-ms.netlify.app', password: 'user04', employeeID: '000004' },
    { email: 'user05@bk-star-ms.netlify.app', password: 'user05', employeeID: '000005' },
    { email: 'user06@bk-star-ms.netlify.app', password: 'user06', employeeID: '000006' },
    { email: 'user07@bk-star-ms.netlify.app', password: 'user07', employeeID: '000007' },
    { email: 'user08@bk-star-ms.netlify.app', password: 'user08', employeeID: '000008' },
    { email: 'user09@bk-star-ms.netlify.app', password: 'user09', employeeID: '000009' }
]
export const addUsers = async (e) => {
    e.preventDefault()
    for (let i = 0; i < 3; i++) {
        const { email, password, employeeID } = credentials[i]
        // const response = await createUserWithEmailAndPassword(auth, email, password)
        // const uid = response.user.uid
        const randomName = uniqueNamesGenerator({
            dictionaries: [names, names],
            length: 2,
            separator: ' ',
        })
        const binary = Math.floor(Math.random() * 1);
        let gender;
        if (binary == 0) {
            gender = "Male";
        }
        else {
            gender = "Female";
        }
        const salary = Math.floor(Math.random() * 5000);
        const soCongLamViec = Math.floor(Math.random() * 5);
        const workingDaysPerMonth = Math.floor(Math.random() * 31);
        const yearOfBirth = getRandomInt(1990, 2008)
        const newDocData = {
            name: randomName,
            gender: gender,
            group: 'web',
            role: 'member',
            salary: salary,
            soCongLamViec: soCongLamViec,
            employeeID: employeeID,
            workingDaysPerMonth: workingDaysPerMonth,
            yearOfBirth: yearOfBirth
        }
        const docRef = await addDoc(collection(firestore, "humans"), newDocData);
        console.log("Document written with ID: ", docRef.id);
    }
    for (let i = 3; i < 6; i++) {
        const { email, password, employeeID } = credentials[i]
        // const response = await createUserWithEmailAndPassword(auth, email, password)
        // const uid = response.user.uid
        const randomName = uniqueNamesGenerator({
            dictionaries: [names, names],
            length: 2,
            separator: ' ',
        })
        const binary = Math.floor(Math.random() * 1);
        let gender;
        if (binary == 0) {
            gender = "Male";
        }
        else {
            gender = "Female";
        }
        const salary = Math.floor(Math.random() * 5000);
        const soCongLamViec = Math.floor(Math.random() * 5);
        const workingDaysPerMonth = Math.floor(Math.random() * 31);
        const yearOfBirth = getRandomInt(1990, 2008)
        const newDocData = {
            name: randomName,
            gender: gender,
            group: 'electronics',
            role: 'member',
            salary: salary,
            soCongLamViec: soCongLamViec,
            employeeID: employeeID,
            workingDaysPerMonth: workingDaysPerMonth,
            yearOfBirth: yearOfBirth
        }
        const docRef = await addDoc(collection(firestore, "humans"), newDocData);
        console.log("Document written with ID: ", docRef.id);
    }
    for (let i = 6; i < 9; i++) {
        const { email, password, employeeID } = credentials[i]
        // const response = await createUserWithEmailAndPassword(auth, email, password)
        // const uid = response.user.uid
        const randomName = uniqueNamesGenerator({
            dictionaries: [names, names],
            length: 2,
            separator: ' ',
        })
        const binary = Math.floor(Math.random() * 1);
        let gender;
        if (binary == 0) {
            gender = "Male";
        }
        else {
            gender = "Female";
        }
        const salary = Math.floor(Math.random() * 5000);
        const soCongLamViec = Math.floor(Math.random() * 5);
        const workingDaysPerMonth = Math.floor(Math.random() * 31);
        const yearOfBirth = getRandomInt(1990, 2008)
        const newDocData = {
            name: randomName,
            gender: gender,
            group: 'mechanics',
            role: 'member',
            salary: salary,
            soCongLamViec: soCongLamViec,
            employeeID: employeeID,
            workingDaysPerMonth: workingDaysPerMonth,
            yearOfBirth: yearOfBirth
        }
        const docRef = await addDoc(collection(firestore, "humans"), newDocData);
        console.log("Document written with ID: ", docRef.id);
    }
}