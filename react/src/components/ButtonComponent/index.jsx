import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MDBBtn } from 'mdbreact';
import { appColors } from '../../constants/colors';
import { buttonTypes } from '../../enums/buttonTypes.enum';

class ButtonComponent extends Component {
  render() {
    const { type, text, action, icon } = this.props;

    let color = appColors.btnSecondary;

    if (type === buttonTypes.primary) {
      color = appColors.btnPrimary;
    }

    return (
      <MDBBtn
        color={color}
        onClick={action}
        className='has-icon'
      >
        {text}
        {icon &&
          <i className='material-icons'>{icon}</i>
        }
      </MDBBtn>
    );
  }
}

ButtonComponent.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  icon: PropTypes.string,
};

export default ButtonComponent;
