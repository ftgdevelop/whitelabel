import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, i18n, withTranslation } from "../../../../i18n";
import { List } from 'antd';

import BookingItem from "./BookingItem";

const BookingItems = (props) => {

    const { t } = props;
    const { pendingList } = props;

    const listData = [];

    {pendingList.items.map((order, index) => (
        listData.push( <BookingItem order={order} index={index} />)
    ))}
        
    return (
        // pendingList.items.map((order, index) => ( <BookingItem order={order} index={index} /> ))
        
        <List
            itemLayout="vertical"
            size="large"
            pagination={{ pageSize: 8, }}
            dataSource={listData}
            renderItem={item => ( <div> {item} </div>)}
        />
    )
}

BookingItems.getInitialProps = async () => ({
    namespacesRequired: ["common"],
});

BookingItems.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation("common")(BookingItems);
  