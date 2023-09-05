import React from 'react';

import SelectServiceTypeItem from './SelectServiceTypeItem';

const SelectServiceType = props => {
    const { availability, setSelectedAvailability } = props;

    return (
        availability && availability.length > 1 ? (
            <div className='margin-bottom-30'>
                {availability && availability.map(item => <SelectServiceTypeItem key={item.id} item={item} onSelectItem={() => (setSelectedAvailability(item))} />)}
            </div>            
        )
        :
            null
    )
}

export default SelectServiceType;
