import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavItem, NavLink,
  NavbarToggler, Collapse,
  Dropdown,
  DropdownToggle,
  DropdownMenu, 
  DropdownItem,
  Fa
} from 'mdbreact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import userActions from '../../redux/actionCreators/userActionCreator';
import { facebookJSSDKSetup } from '../../utils/auth.utils';
import { APP } from '../../constants/routes';
import { appColors } from '../../constants/colors';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    facebookJSSDKSetup();
  }

  toggleCollapse = () => this.setState({ isOpen: !this.state.isOpen });
  

  logout = () => {
    const { dispatch } = this.props;
    window.FB.logout(response => {
      dispatch(userActions.logout());
    });
  }

  render() {
    const { currentUser } = this.props;

    return (
      <Navbar color={appColors.primary} dark expand='md' style={{}}>
        <NavbarBrand>
          <Link to={APP.ROOT}>
            <strong className='white-text'>Movie App</strong>
          </Link>
        </NavbarBrand>
        <NavbarToggler
          onClick={this.toggleCollapse}
        />
        <Collapse id='navbarCollapse3' isOpen={this.state.isOpen} navbar>
          <NavbarNav left>
            <NavItem active>
              <NavLink to={APP.ROOT}>Home</NavLink>
            </NavItem>

            {currentUser &&
              <React.Fragment>
                <NavItem>
                  <NavLink to={APP.MOVIE.POPULAR_MOVIES}>Most popular</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={APP.MOVIE.MOST_RATED_MOVIES}>Most rated</NavLink>
                </NavItem>
              </React.Fragment>
            }
          </NavbarNav>

          {currentUser &&
            <NavbarNav right>
              <NavItem>
                <Dropdown>
                  <DropdownToggle  nav caret>
                    <div className='d-none d-md-inline'>Your movie lists</div>
                  </DropdownToggle>
                  <DropdownMenu className='dropdown-default'right>
                    <DropdownItem href='#!'>Watched movies</DropdownItem>
                    <DropdownItem href='#!'>Rated movies</DropdownItem>
                    <DropdownItem href='#!'>To-watch list</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
              <NavItem>
                <Dropdown>
                  <DropdownToggle nav caret>
                    <Fa icon='user' />
                  </DropdownToggle>
                  <DropdownMenu className='dropdown-default' right>
                    <DropdownItem href={APP.PROFILE}>Profile</DropdownItem>
                    <DropdownItem onClick={this.logout}>Logout</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
            </NavbarNav>
          }

        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser,
  };
};

export default connect(mapStateToProps)(NavigationBar);
