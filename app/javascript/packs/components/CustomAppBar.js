import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link, withRouter } from 'react-router-dom'
import TelegramLoginButton from 'react-telegram-login';

import UserAvatar from './UserAvatar';
import Logo from './Logo';

import { showSignUpDialog } from '../actions/signUpDialog';
import { showUploadDialog } from '../actions/uploadDialog';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  rootLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed',
  },
  titleZone: {
    display: 'flex',
  },
  settingsLayoutContainer: {
    flexGrow: 1,
    position: 'absolute',
    width: 'calc(100% - 660px)',
    left: 300,
  },
  pageTitle: {
    marginLeft: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    marginTop: 5,
    marginBottom: 5,
    lineHeight: '36px',
    borderLeft: '1px solid rgba(255, 255, 255, 0.3)'
  },
  userName: {
    marginRight: theme.spacing.unit,
    lineHeight: '56px',
  },
  toolBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  toolbar: theme.mixins.toolbar,
});

class CustomAppBar extends React.Component {
  handleTelegramResponse(response) {
    console.log(response);
  }

  render() {
    const { classes, pageTitle, settingsLayout, children, currentUser } = this.props;

    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.titleZone}>
            <Link to='/' className={classes.rootLink}>
              <Logo />
            </Link>
            { pageTitle && <Typography variant="headline" className={classes.pageTitle}>
              {pageTitle}
            </Typography>}
          </div>
          {
            settingsLayout ?
              <div className={classes.settingsLayoutContainer}>
                <Grid container alignItems="center" justify="center">
                  <Grid container item xs={6}>
                    {children}
                  </Grid>
                </Grid>
              </div> : children
          }
          {
            currentUser &&
              <ButtonBase
                component={(props) => <Link to='/profile' {...props} />}
                focusRipple
              >
                <Typography variant="subheading" className={classes.userName}>
                  {currentUser.name}
                </Typography>
                <UserAvatar user={currentUser} />
              </ButtonBase>
          }
          {
            currentUser &&
              <div>
                <Button
                  onClick={() => props.showUploadDialog()}
                  variant="contained"
                  size="large"
                >
                  Upload
                </Button>
              </div>
          }
          {
            !currentUser &&
              <div>
                <TelegramLoginButton dataOnauth={(response) => this.handleTelegramResponse(response)} botName="MurrtubeBot" />
              </div>
          }
        </Toolbar>
      </AppBar>
    );
  }
}

// <script async src="https://telegram.org/js/telegram-widget.js?4" data-telegram-login="MurrtubeBot" data-size="large" data-radius="6" data-onauth="onTelegramAuth(user)"></script>
// <script type="text/javascript">
//   function onTelegramAuth(user) {
//     alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
//   }
// </script>


const ConnectedCustomAppBar = connect(
  ({ pageTitle }) => ({
    currentUser: null,
    pageTitle
  }),
  (dispatch) => ({
    showSignUpDialog: () => dispatch(showSignUpDialog()),
    showUploadDialog: () => dispatch(showUploadDialog())
  })
)(CustomAppBar)

export default withStyles(styles)(withRouter(ConnectedCustomAppBar));
