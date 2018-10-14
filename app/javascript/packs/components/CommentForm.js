import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { withStyles } from '@material-ui/core/styles';
import gql from "graphql-tag";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Mutation } from "react-apollo";

import UserAvatar from './UserAvatar';
import withCurrentSession from './withCurrentSession';
import { CREATE_COMMENT, GET_COMMENTS_BY_MEDIUM, GET_MEDIUM } from '../queries';

import Logo from './Logo';

const styles = theme => ({
  root: {
    flex: 1,
  },
  textFieldContainer: {
    flex: 1,
    marginLeft: theme.spacing.unit,
  },
  actions: {
    textAlign: "right",
    marginTop: theme.spacing.unit
  },
  cancelButton: {
    marginRight: theme.spacing.unit
  }
})

class CommentForm extends React.Component {
  state = {
    showAction: false,
    body: ""
  }

  render() {
    const { classes, mediumId, parentId, currentSession } = this.props;

    if (!currentSession) {
      return (null);
    }

    return (
      <Mutation
        mutation={CREATE_COMMENT}
        update={(cache, { data: { createComment } }) => {
          const { commentsByMedium } = cache.readQuery({ query: GET_COMMENTS_BY_MEDIUM, variables: { mediumId, parentId, page: 1, per: 20 } });
          cache.writeQuery({
            query: GET_COMMENTS_BY_MEDIUM,
            variables: { mediumId, parentId, page: 1, per: 20 },
            data: { commentsByMedium: [ createComment.comment, ...commentsByMedium ] }
          });

          const { medium } = cache.readQuery({ query: GET_MEDIUM, variables: { id: mediumId } });
          cache.writeQuery({
            query: GET_MEDIUM,
            variables: { id: mediumId },
            data: { medium: { ...medium, commentsCount: (medium.commentsCount + 1) } }
          });
        }}
      >
        {( createComment, { data }) => (
          <div className={classes.root}>
            <Grid container spacing={8} alignItems="flex-start">
              <Grid item>
                <UserAvatar user={currentSession.user} />
              </Grid>
              <Grid item className={classes.textFieldContainer}>
                <TextField
                  name="body"
                  margin="dense"
                  placeholder={parentId ? "Add a public reply…" : "Add a public comment…"}
                  type="text"
                  fullWidth
                  multiline
                  rows={1}
                  rowsMax={12}
                  value={this.state.body}
                  onChange={(e) => this.setState({ body: e.target.value })}
                  onFocus={() => this.setState({ showAction: true })}
                />
              </Grid>
            </Grid>
            <div className={classes.actions}>
              {
                this.state.body.length > 0 &&
                  <Button
                    className={classes.cancelButton}
                    onClick={() => {
                      this.setState({ body: '', showAction: false })
                    }}
                  >
                    Cancel
                  </Button>
              }
              <Button
                color={'primary'}
                variant={"contained"}
                disabled={this.state.body.replace(/\s+/g,"").length === 0}
                onClick={() => {
                  createComment({
                    variables: {
                      input: {
                        body: this.state.body,
                        mediumId
                      }
                    }
                  });
                  this.setState({ body: '', showAction: false })
                }}
              >
                Send
              </Button>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(withCurrentSession(CommentForm));
