import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MDBBtn } from 'mdbreact';
import { appColors } from '../../constants/colors';
import { buttonTypes } from '../../enums/buttonTypes.enum';

class Button extends Component {
  render() {
    const { type, text, action } = this.props;
  
    let color = appColors.btnSecondary;
    
    if (type === buttonTypes.primary) {
      color = appColors.btnPrimary;
    }

    return (
      <MDBBtn
        color={color}
        onClick={action}
      >
        {text}
      </MDBBtn>
    );
  }
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};

export default Button;