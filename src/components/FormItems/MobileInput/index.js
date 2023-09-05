import React, {useState} from "react";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { GlobalOutlined } from '@ant-design/icons';

import "./style.css";

function MobileInput(props) {

    const {
        defaultValue,
        defaultCountry,
        placeholder,
        onChange
    } = props;

    const [value, setValue] = useState(defaultValue);

    return (
        <div className="mobile-input">
            <PhoneInput
                countrySelectProps={{unicodeFlags: true}}
                defaultCountry={defaultCountry}
                placeholder={placeholder}
                onChange={input => {
                    setValue(input);
                    if (onChange)
                        onChange(input && input[0]==="+" ? input.substring(1, input.length) : input);
                }}
                international
                value={value}
                internationalIcon={GlobalOutlined}
            />
        </div>
    );
}

export default MobileInput;