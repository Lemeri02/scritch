import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { withStyles } from '@material-ui/core/styles';
import { Link} from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Mutation } from 'react-apollo';

import FormattedText from './FormattedText';
import UserAvatar from './UserAvatar';
import withCurrentSession from './withCurrentSession';

import { DELETE_COMMENT, GET_MEDIUM } from '../queries';

import timeAgo from '../timeAgo';

const styles = theme => ({
  comment: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit
  },
  commentHeader: {
    padding: 0,
    paddingBottom: theme.spacing.unit,
  },
  userLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
})

class Comment extends React.Component {
  state = {
    menuAnchor: null,
    showMenuButton: false,
  };

  render() {
    const { comment, currentSession, classes, medium } = this.props;
    let canDelete = false;
    if (currentSession.user.id === comment.user.id) {
      canDelete = true;
    }
    if (currentSession.user.id === medium.user.id) {
      canDelete = true;
    }

    return (
      <div className={classes.comment}>
        <CardHeader
          className={classes.commentHeader}
          avatar={
            <Link to={`/${comment.user.slug}`} className={classes.userLink}>
              <UserAvatar user={comment.user} />
            </Link>
          }
          onMouseEnter={() => {
            this.setState({ showMenuButton: true });
          }}
          onMouseLeave={() => {
            this.setState({ showMenuButton: false });
          }}
          action={
            canDelete &&
              <div>
                {
                  this.state.showMenuButton &&
                    <IconButton
                      aria-owns={this.state.menuAnchor ? `menu-${comment.id}` : null}
                      aria-haspopup="true"
                      onClick={(event) => this.setState({ menuAnchor: event.currentTarget })}
                    >
                      <MoreVertIcon />
                    </IconButton>
                }
                <Menu
                  id={`menu-${comment.id}`}
                  anchorEl={this.state.menuAnchor}
                  open={Boolean(this.state.menuAnchor)}
                  onClose={() => this.setState({ menuAnchor: null })}
                >
                  {
                    canDelete &&
                      <Mutation
                        mutation={DELETE_COMMENT}
                        update={(cache) => {
                          cache.writeQuery({
                            query: GET_MEDIUM,
                            variables: { id: medium.id },
                            data: {
                              medium: {
                                ...medium,
                                commentsCount: (medium.commentsCount - 1),
                                comments: medium.comments.filter((otherComment) => otherComment.id !== comment.id)
                              }
                            }
                          });
                        }}
                      >
                        {(deleteComment) => (
                          <MenuItem
                            onClick={() => {
                              deleteComment({
                                variables: {
                                  input: {
                                    id: comment.id
                                  }
                                }
                              });
                            }}
                          >
                            Delete
                          </MenuItem>
                        )}
                      </Mutation>
                  }
                </Menu>
              </div>
          }
          title={<Link to={`/${comment.user.slug}`} className={classes.userLink}>{comment.user.name}</Link>}
          subheader={timeAgo.format(new Date(comment.createdAt))}
        />
        <FormattedText text={comment.body} />
      </div>
    );
  }
}

export default withStyles(styles)(
  withCurrentSession(Comment)
);
