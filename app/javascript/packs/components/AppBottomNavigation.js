import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo';

import withCurrentSession from './withCurrentSession';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

import ActivitiesDialog from './ActivitiesDialog';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import OnDemandVideoIcon from '@material-ui/icons/OndemandVideo';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

import { GET_UNREAD_ACTIVITY_COUNT } from '../queries';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 1,
  },
  bottomNavigationSpacer: {
    height: 56
  },
  label: {
    color: theme.palette.secondary.main,
  },
  selected: {
    '&$selected': {
      paddingTop: 6,
      color: theme.palette.secondary.main,
    },
  }
});

const routes = {
  latest: '/',
  trending: '/trending',
  subscriptions: '/subscriptions',
};

class AppBottomNavigation extends React.Component {
  state = {
    value: null,
    activitiesDialog: false
  };

  componentDidMount() {
    this.handleLocation(this.props.location);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      this.handleLocation(nextProps.location);
    }
  }

  handleLocation(location) {
    if (location.pathname === '/videos' || location.pathname === '/') {
      this.setState({ value: 'latest'});
    }
    else if (location.pathname === '/trending') {
      this.setState({ value: 'trending'});
    }
    else if (location.pathname === '/subscriptions') {
      this.setState({ value: 'subscriptions'});
    }
    else {
      this.setState({ value: null });
    }
  }

  handleChange = (e, value) => {
    if (value === 'notifications') {
      this.setState({ activitiesDialog: true });
    } else {
      this.props.history.push({
        pathname: routes[value]
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    if (!value) {
      return (null);
    }

    return (
      <React.Fragment>
        <div className={classes.bottomNavigationSpacer}></div>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          className={classes.root}
        >
          <BottomNavigationAction
            className={classes.action}
            classes={{
              label: classes.label,
              selected: classes.selected,
            }}
            label="Latest"
            value="latest"
            icon={<OnDemandVideoIcon />}
          />
          <BottomNavigationAction
            className={classes.action}
            classes={{
              label: classes.label,
              selected: classes.selected,
            }}
            label="Trending"
            value="trending"
            icon={<WhatshotIcon />}
          />
          {
            this.props.currentSession &&
              <BottomNavigationAction
                className={classes.action}
                classes={{
                  label: classes.label,
                  selected: classes.selected,
                }}
                label="Subscriptions"
                value="subscriptions"
                icon={<SubscriptionsIcon />}
              />
          }
          {
            this.props.currentSession &&
              <BottomNavigationAction
                className={classes.action}
                classes={{
                  label: classes.label,
                  selected: classes.selected,
                }}
                label="Notifications"
                value="notifications"
                icon={
                  <Query query={GET_UNREAD_ACTIVITY_COUNT} pollInterval={parseInt(process.env.UNREAD_ACTIVITY_COUNT_REFRESH_INTERVAL)}>
                    {({ loading, error, data }) => (
                      loading || !data || data.unreadActivityCount === 0 ? <NotificationsNoneIcon /> : <NotificationsIcon />
                    )}
                  </Query>
                }
              />
          }
        </BottomNavigation>
        <ActivitiesDialog open={this.state.activitiesDialog} onClose={() => this.setState({ activitiesDialog: false })} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(withCurrentSession(AppBottomNavigation)));
