import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import DefaultAvatar from './DefaultAvatar';
import OnlineIcon from '@material-ui/icons/FiberManualRecord';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    position: 'relative',
  }
});

const UserAvatar = ({ user, classes }) => (
  <div style={{ position: 'relative' }}>
    {user.avatar ?
      <Avatar src={user.avatar} /> :
      <DefaultAvatar text={(user.name || "").replace(/[\W_]+/g, "")[0] || "*"} size={56} key="avatar" />}
  </div>
)

export default withStyles(styles)(UserAvatar);
