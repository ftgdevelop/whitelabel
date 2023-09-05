import React, { useState } from "react";
import {Form} from "antd";

const LabelInput = props => {

    const [active, setActive] = useState(false);

    const { label, type, onChange ,rules,name,initialValue} = props;

    const changeHandle = e => {
        if (e.target.value) {
            setActive(true);
        }else{
            setActive(false);
        }
        if (onChange) {
            onChange(e);
        }
    }
    const blueHandler = e => {
        if (e.target.value){
            setActive(true); 
        }else{
            setActive(false);
        }
    }

    return (
        <Form.Item initialValue={initialValue} label={label} name={name} rules={rules} className={`label-input ${active ? "active" : ""}`}>
            <input
                onChange={changeHandle}
                onFocus={() => { setActive(true) }}
                onBlur ={blueHandler}
            />
        </Form.Item>
    );
};

export default LabelInput;