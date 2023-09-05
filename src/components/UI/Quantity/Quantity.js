import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

const Quantity = props => {
    const [value, setValue] = useState(props.min != undefined ? props.min : 1);

    const decrease = () => {
        if (props.min == null || value > props.min) {
            setValue(prevValue => prevValue - 1);
        };
    }

    const increase = () => {
        if (props.max == null || value < props.max) {
            setValue(prevValue => prevValue + 1);
        };
    }
    useEffect(() => {
        props.onChange(value);
    }, [value]);

    return (
        <div className="quantity-input-wrapper">
            <MinusOutlined className={`decrease ${props.min != null && value <= props.min ? "disabled" : ""}`} onClick={decrease} />
            <input type="text" readOnly value={value} name="counter"/>
            <PlusOutlined className={`increase ${props.max != null && value >= props.max ? "disabled" : ""}`} onClick={increase} />
        </div>
    );
};

export default Quantity;
