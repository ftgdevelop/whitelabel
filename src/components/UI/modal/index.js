import React from 'react';

import styles from './Modal.module.css';

const modal = (props) => {
  return (
    <div className={styles.modal_default}>
      <div className={styles.modal_wrapper}
        style={{
          transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}
      >
        <div className={styles.modal_body}>
            <div className={styles.modal_header}>
              <div>تغییر جستجو</div>
              <span className={styles.close_modal_btn} onClick={props.close}>بستن</span>
            </div>
            {props.children}
        </div>
      </div>
    </div>
  )
}

export default modal;
