import { useState } from 'react';


export const useForm = <T>(initialForm: T = {} as T) => {

    const [formState, setFormState] = useState<T>(initialForm);

    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }


    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        setFormState
    }
}