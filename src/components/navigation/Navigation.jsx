import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ListItem, List } from './styled';
import { Button } from '../ui';

class Navigation extends PureComponent {
  state = {
    navItems: [
      { label: 'Services', path: '/services', onlyCoach: true },
      { label: 'Customers', path: '/customers', onlyCoach: true },
      // { label: "Calendar", path: "/schedule", onlyCoach: true},
      { label: 'Library', path: '/library/exercises', onlyCoach: true },
      { label: 'Messages', path: '/inbox', onlyCoach: false },
    ],
  };

  render() {
    const { navItems } = this.state;
    const { user } = this.props;

    return (
      <List className='navigation'>
        <ListItem>
          {!user.isCoach && (
            <Link key={-1} to='/coach/new'>
              <Button is='div' label={'Become a Coach'} appearance='minimal' />
            </Link>
          )}
          {navItems.map((navItem, index) => (
            <Link
              key={index}
              to={navItem.path}
              style={{
                display: navItem.onlyCoach && !user.isCoach ? 'none' : 'block',
              }}
            >
              <Button is='div' label={navItem.label} appearance='minimal' />
            </Link>
          ))}
        </ListItem>
      </List>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.current,
});

export default connect(mapStateToProps)(Navigation);
