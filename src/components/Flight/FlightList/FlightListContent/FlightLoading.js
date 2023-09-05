import React from 'react'
import { Modal } from 'antd';

export default class FlightLoading extends React.Component {
  state = {
    visible: this.props.visible,
  };

    componentWillReceiveProps = nextProps => {
        if (nextProps.visible !== this.props.visible)
            this.setState({visible: nextProps.visible});
    };

 

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    return (
      <>
        <Modal
          open={visible}
          onCancel={this.handleCancel}
          footer={null}
          closable={false}
        >
        Loading...
        </Modal>
      </>
    );
  }
}

