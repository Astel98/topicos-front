import { useState } from "react"


export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }


    const handleInputChange = ({ target }) => {

        if (target.name.includes('path')) {
            setValues({
                ...values,
                [target.name]: target.files[0]
            });
        }
        else {
            setValues({
                ...values,
                [target.name]: target.value
            });
        }

    }

    return { values, handleInputChange, reset }

}


export const useFormDoc = (initialState = {}) => {

    const [docs, setDocs] = useState(initialState);

    const reset = () => {
        setDocs(initialState);
    }


    const handleInputChangeDoc = ({ target }) => {

        setDocs({
            ...docs,
            [target.name]: target.files[0]
        });

    }

    return { docs, handleInputChangeDoc, reset }

}


// //Password
// const [pass, setPass] = useState('password');
// const [icono, setIcono] = useState('bi bi-eye-slash');
// const alternarPass = () => {
//     if (pass === 'password') {
//         setPass('text')
//         setIcono('bi bi-eye')
//     } else {
//         setPass('password')
//         setIcono('bi bi-eye-slash')
//     };
// }
// //Confirmar Password
// const [confir, setConfir] = useState('password');
// const [iconoC, setIconoC] = useState('bi bi-eye-slash');
// const alternarConfir = () => {
//     if (confir === 'password') {
//         setConfir('text')
//         setIconoC('bi bi-eye')
//     } else {
//         setConfir('password')
//         setIconoC('bi bi-eye-slash')
//     };
// }