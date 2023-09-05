import React from 'react'

const style = {
    'padding': '10px', 
    'margin': '5px 0px 30px', 
    'borderBottom': '2px solid rgb(229, 229, 229)', 
    'display': 'inline-block',
    'cursor': 'pointer',
    'width': '33%', 
    'textAlign': 'center',
    'direction': 'rtl'
}
const activeStyle = {...style, 'borderBottom': '2px solid rgb(231, 65, 42)'}

const CustomTab = ({children, isActive}) =>
    <span style={isActive ? activeStyle : style}>{children}</span>

export default CustomTab
