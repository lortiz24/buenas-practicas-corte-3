import { useState } from "react";

export const useMyTabs = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return {
        value,
        handleChange
    }

}
