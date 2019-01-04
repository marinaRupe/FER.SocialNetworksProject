import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Fa,
} from 'mdbreact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../history';
import { APP } from '../../constants/routes';
import { appColors } from '../../constants/colors';
import { facebookJSSDKSetup, logout } from '../../utils/auth.utils';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    console.log('mount navigation');
    facebookJSSDKSetup(this.props.dispatch);
  }

  toggleCollapse = () => this.setState({ isOpen: !this.state.isOpen });

  handleDropdownItemClick = e => {
    e.preventDefault();
    history.push(e.target.getAttribute('href'));
  }

  logout = e => {
    e.preventDefault();
    logout(this.props.dispatch);
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
            <NavItem>
              <NavLink to={APP.ROOT}>Home</NavLink>
            </NavItem>
            {!currentUser &&
              <NavItem>
                <NavLink to={APP.PRIVACY_POLICY}>Privacy policy</NavLink>
              </NavItem>
            }
            {currentUser &&
              <React.Fragment>
                <NavItem>
                  <NavLink to={APP.MOVIE.POPULAR_MOVIES}>Most popular</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={APP.MOVIE.MOST_RATED_MOVIES}>Most rated</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={APP.MOVIE.NOW_PLAYING_MOVIES}>Now playing</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={APP.MOVIE.PERSONAL.RECOMMENDED_MOVIES}>Recommended</NavLink>
                </NavItem>
              </React.Fragment>
            }
          </NavbarNav>

          {currentUser &&
            <NavbarNav right>
              <NavItem>
                <Dropdown>
                  <DropdownToggle nav caret>
                    <div className='d-none d-md-inline'>Your movie lists</div>
                  </DropdownToggle>
                  <DropdownMenu className='dropdown-default' right>
                    <DropdownItem href={APP.MOVIE.PERSONAL.USER_WATCHED_MOVIES} onClick={this.handleDropdownItemClick}>
                      Watched movies
                    </DropdownItem>
                    <DropdownItem href={APP.MOVIE.PERSONAL.USER_RATED_MOVIES} onClick={this.handleDropdownItemClick}>
                      Rated movies
                    </DropdownItem>
                    <DropdownItem href={APP.MOVIE.PERSONAL.USER_SAVED_MOVIES} onClick={this.handleDropdownItemClick}>
                      Saved movies
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
              <NavItem>
                <Dropdown>
                  <DropdownToggle nav caret>
                    <Fa icon='user' />
                  </DropdownToggle>
                  <DropdownMenu className='dropdown-default' right>
                    <DropdownItem href={APP.PROFILE} onClick={this.handleDropdownItemClick}>
                      Profile
                    </DropdownItem>
                    <DropdownItem href={APP.PRIVACY_POLICY} onClick={this.handleDropdownItemClick}>
                      Privacy policy
                    </DropdownItem>
                    <DropdownItem onClick={this.logout} className='logout-link'>
                      Logout
                    </DropdownItem>
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
