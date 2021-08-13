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

export const useFormError = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }


    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [target.attributes.ename.value]: target.attributes['aria-invalid'].value
        });

    }

    return { values, handleInputChange, reset }

}

export const useFormEMessage = (initialState = {}) => {

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
