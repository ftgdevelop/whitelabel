import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Alert, Form, Input } from 'antd'

const { TextArea } = Input;

export const SendEmail = () => {
  const form = useRef();
  const initialValue = { name: "", email: "", message: "" };
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const sendEmail = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      emailjs.sendForm('service_s4sgbja', 'or_template', form.current, '4SYPzNMGM_O8s1q_-')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    }
  }, [formErrors])

  const validate = (values) => {
    const errors = {};
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!values.name) {
      errors.name = "نام خود را وارد نمایید!";
    }
    if (!values.email) {
      errors.email = "ایمیل خود را وارد نمایید!";
    } else if (!regex.test(values.email)) {
      errors.email = "لطفا ایمیل را به درستی وارد نمایید!"
    }
    if (!values.message) {
      errors.message = "متن پیام را وارد نمایید!";
    }
    return errors;
  }

  return (
    <form ref={form} onSubmit={sendEmail}>
      <input type="text" name="name" placeholder="نام" value={formValues.name} onChange={handleChange} />
      <input type="email" name="email" placeholder="ایمیل" value={formValues.email} onChange={handleChange} />
      <input type="text" name="subject" placeholder="عنوان" />
      <textarea name="message" rows="4" placeholder="متن" value={ formValues.message } onChange={handleChange} />
      
      {formErrors.name ? <Alert message={formErrors.name} type="warning" closable /> : null}
      {formErrors.email ? <Alert message={formErrors.email} type="warning" closable /> : null}
      {formErrors.message ? <Alert message={formErrors.message} type="warning" closable /> : null}

      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <Alert message="پیام شما با موفقیت ارسال گردید." type="success" />
      ) : (
          null
      )}
      
      <input type="submit" value="ارسال" />
    </form>
  );
};