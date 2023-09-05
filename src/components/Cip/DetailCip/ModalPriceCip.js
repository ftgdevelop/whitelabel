import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { Modal, Table } from 'antd';

import styles from '../../../styles/Cip.module.css'
import { DollarCircleOutlined } from '@ant-design/icons';

const numberWithCommas = (x) => {
    if (x) {
        return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
    }
    return 0;
};


const columns = [
    {
      title: 'عنوان خدمات',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'تابعیت ایرانی (ریال)',
      dataIndex: 'nationalVal',
      key: 'nationalVal',
      render: (e)=><span> {numberWithCommas(e)}</span>
    },
    {
      title: 'تابعیت خارجی (ریال)',
      dataIndex: 'interNationalVal',
      key: 'interNationalVal',
      render: (e)=><span> {numberWithCommas(e)}</span>
    },
];

const ModalPriceCip = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    return (
        <div>
            <div className={styles.showPriceList} onClick={showModal}>
                <DollarCircleOutlined />
                <span>تعرفه خدمات</span>
            </div>
            <Modal
                title={
                    <div className={styles.modalCreateAccountLink}>
                        تعرفه خدمات
                    </div>
                }
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width={800}
                >
                <div className={styles.contentShowPriceList}>
                    <Table 
                        columns={columns}
                        dataSource={props.data}
                        pagination={false}
                        />
                </div>
            </Modal>
        </div>
    );
};

ModalPriceCip.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

ModalPriceCip.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(ModalPriceCip)
