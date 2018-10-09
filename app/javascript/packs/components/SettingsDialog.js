import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, Mutation, withApollo } from 'react-apollo';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PageTitle from './PageTitle';
import ResponsiveDialog from './ResponsiveDialog';
import themeSelector from '../themeSelector';
import GlobalProgress from './GlobalProgress';

import { GET_SESSION, DELETE_USER, UPDATE_USER, GET_THEME } from '../queries';

const styles = theme => ({
});

class Settings extends React.Component {
  state = {
    accountSuppressionAlertOpen: false,
  }

  render() {
    const { classes, match, width } = this.props;

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <GlobalProgress absolute />
        <DialogTitle>{"Settings"}</DialogTitle>
        <DialogContent>
          <Query query={GET_SESSION}>
            {({ loading, error, data: sessionData }) => {
              if (loading || !sessionData.session) {
                return (null);
              }

              return (
                <React.Fragment>
                  <Mutation
                    mutation={UPDATE_USER}
                    update={(cache, { data: { updateUser } }) => {
                      cache.writeQuery({
                        query: GET_SESSION,
                        data: { session: { ...sessionData.session, user: updateUser.user } }
                      });
                      themeSelector(updateUser.user.theme);
                    }}
                  >
                    {( updateUser, { data }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={sessionData.session.user.theme === 'light'}
                            onChange={(e, value) => {
                              updateUser({ variables: { input: { id: sessionData.session.user.id, theme: value ? 'light' : 'dark' }}});
                            }}
                            color="primary"
                          />
                        }
                        label="Light theme"
                      />
                    )}
                  </Mutation>
                  <Dialog
                    open={this.state.accountSuppressionAlertOpen}
                    onClose={() => this.setState({ accountSuppressionAlertOpen: false })}
                  >
                    <DialogTitle>{"Are you sure you want to delete your account?"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        All your data will be permanently deleted, this operation cannot be undone.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => this.setState({ accountSuppressionAlertOpen: false })} autoFocus>
                        Cancel
                      </Button>
                      <Mutation
                        mutation={DELETE_USER}
                        update={(cache) => {
                          cache.writeQuery({
                            query: GET_SESSION,
                            data: { session: null }
                          });
                          themeSelector();
                        }}
                      >
                        {( deleteUser, { data }) => (
                          <Button
                            color="secondary"
                            onClick={() => {
                              deleteUser({ variables: { input: { id: sessionData.session.user.id }}}).then(() => {
                                localStorage.setItem('token', null);
                                this.props.history.push({
                                  pathname: '/',
                                });
                              });
                            }}
                          >
                            Confirm
                          </Button>
                        )}
                      </Mutation>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              );
            }}
          </Query>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={0} justify="space-between">
            <Grid item>
              <Button
                color={"secondary"}
                onClick={() => {
                  this.setState({ accountSuppressionAlertOpen: true });
                }}
                >
                  Delete your account
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={this.props.onClose}>
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(withApollo(Settings));
