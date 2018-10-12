import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, Mutation, withApollo } from 'react-apollo';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import timeAgo from '../timeAgo';
import dayjs from 'dayjs';
import ResponsiveDialog from './ResponsiveDialog';
import GlobalProgress from './GlobalProgress';
import UserAvatar from './UserAvatar';
import EmptyList from './EmptyList';
import LoadMoreButton from './LoadMoreButton';
import TruncatedText from './TruncatedText';

import { GET_ACTIVITIES, READ_ACTIVITIES, CLEAR_ACTIVITIES, GET_UNREAD_ACTIVITY_COUNT } from '../queries';

const styles = theme => ({
  emptyNoficationContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8,
  },
  emptyNoficationIcon: {
    fontSize: 2,
    display: 'block',
    fontSize: '4em',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing.unit,
    color: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
  },
  notificationsContainer: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  loadMoreContainer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  commentBody: {
    fontStyle: "italic",
  }
});

class ActivitiesDialog extends React.Component {
  state = {
    accountSuppressionAlertOpen: false,
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.open && nextProps.open) {
      this.props.client.mutate({
        mutation: READ_ACTIVITIES,
        variables: { input: {} },
        update: (cache) => {
          cache.writeQuery({
            query: GET_UNREAD_ACTIVITY_COUNT,
            data: {
              unreadActivityCount: 0
            }
          });
        }
      });
    }
  }

  renderLikeCreate(activity) {
    return (
      <ListItem
        key={activity.id}
        button
        onClick={() => {
          this.props.history.push({
            pathname: `/${activity.owner.slug}`
          });
          this.props.onClose();
        }}
      >
        <UserAvatar user={activity.owner} />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                <Typography variant="body2" component="span" style={{display: 'inline-block'}}>
                  {activity.owner.name}
                </Typography>
                {` liked your video `}
                <Typography variant="body2" component="span" style={{display: 'inline-block'}}>
                  {activity.trackable.medium.title}
                </Typography>
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderCommentCreate(activity) {
    const { classes } = this.props;

    return (
      <ListItem
        key={activity.id}
        button
        onClick={() => {
          this.props.history.push({
            pathname: `/${activity.owner.slug}`
          });
          this.props.onClose();
        }}
      >
        <UserAvatar user={activity.owner} />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                <Typography variant="body2" component="span" style={{display: 'inline-block'}}>
                  {activity.owner.name}
                </Typography>
                {` commented on your video `}
                <Typography variant="body2" component="span" style={{display: 'inline-block'}}>
                  {activity.trackable.medium.title}
                </Typography>
              </Typography>
              <Typography variant="body1" paragraph className={classes.commentBody}>
                <TruncatedText limit={100}>{activity.trackable.body}</TruncatedText>
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderFollowCreate(activity) {
    return (
      <ListItem
        key={activity.id}
        button
        onClick={() => {
          this.props.history.push({
            pathname: `/${activity.owner.slug}`
          });
          this.props.onClose();
        }}
      >
        <UserAvatar user={activity.owner} />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                <Typography variant="body2" component="span" style={{display: 'inline-block'}}>
                  {activity.owner.name}
                </Typography>
                {` follows you`}
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderMediumPublished(activity) {
    return (
      <ListItem
        key={activity.id}
        button
        onClick={() => {
          this.props.history.push({
            pathname: `/videos/${activity.trackable.id}`
          });
          this.props.onClose();
        }}
      >
        <UserAvatar user={activity.owner} />
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="body1">
                {`Your video `}
                <Typography variant="body2" component="span" style={{display: 'inline-block'}}>
                  {activity.trackable.title}
                </Typography>
                {` was successfully published.`}
              </Typography>
            </React.Fragment>
          }
          secondary={timeAgo.format(dayjs(activity.createdAt).toDate())}
        />
      </ListItem>
    );
  }

  renderActivity(activity) {
    console.log(activity.key)
    switch (activity.key) {
      case 'like.create':
        return (this.renderLikeCreate(activity));
        break;
      case 'follow.create':
        return (this.renderFollowCreate(activity));
        break;
      case 'comment.create':
        return (this.renderCommentCreate(activity));
      case 'medium.published':
        return (this.renderMediumPublished(activity));
      default:
        return (null);
    }
  }

  render() {
    const { classes, match, width } = this.props;
    let page = 1;
    let per = 30;

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={this.props.onClose}
        className={classes.root}
      >
        <GlobalProgress absolute />
          <Query query={GET_ACTIVITIES} variables={{ page, per }} fetchPolicy="network-only">
            {({ loading, error, data, fetchMore }) => {
              if (loading || error || !data.activities) {
                return (null);
              }

              return (
                <React.Fragment>
                  {
                    data.activities.length === 0 ?
                      <DialogContent className={classes.emptyNoficationContainer}>
                        <NotificationsNoneIcon className={classes.emptyNoficationIcon} />
                        <EmptyList
                          label={`No recent activity`}
                        />
                      </DialogContent> :
                      <DialogContent className={classes.notificationsContainer}>
                        <List>
                          {
                            data.activities.map((activity) => (
                              this.renderActivity(activity)
                            ))
                          }
                        </List>
                        {
                          ((data.activities.length % per) === 0 && data.activities.length / per === page) &&
                            <div className={classes.loadMoreContainer}>
                              <LoadMoreButton
                                noMargin
                                onClick={() => {
                                  page++;

                                  fetchMore({
                                    variables: {
                                      page,
                                      per
                                    },
                                    updateQuery: (prev, { fetchMoreResult }) => {
                                      if (!fetchMoreResult) return prev;

                                      return Object.assign({}, prev, {
                                        activities: [...prev.activities, ...fetchMoreResult.activities]
                                      });
                                    }
                                  });
                                }}
                              />
                            </div>
                        }
                      </DialogContent>
                  }
                  <DialogActions>
                    <Mutation
                      mutation={CLEAR_ACTIVITIES}
                      update={(cache) => {
                        cache.writeQuery({
                          query: GET_ACTIVITIES,
                          data: { activities: [] }
                        });
                        cache.writeQuery({
                          query: GET_UNREAD_ACTIVITY_COUNT,
                          data: {
                            unreadActivityCount: 0
                          }
                        });
                      }}
                    >
                      {( clearActivities, {}) => (
                        <Button onClick={() => clearActivities({ variables: { input: {} }})} disabled={loading || error || !data || data.activities.length === 0}>
                          Clear all notifications
                        </Button>
                      )}
                    </Mutation>
                    <Button onClick={this.props.onClose}>
                      Close
                    </Button>
                  </DialogActions>
                </React.Fragment>
              );
            }}
        </Query>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(
  withApollo(
    withRouter(ActivitiesDialog)
  )
);
