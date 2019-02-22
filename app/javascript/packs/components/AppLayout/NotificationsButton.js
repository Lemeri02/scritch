import React from "react";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "../withCurrentSession";
import { Query } from "react-apollo";
import IconButton from "@material-ui/core/IconButton";

import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";

import { GET_UNREAD_ACTIVITY_COUNT } from "../../queries/activityQueries";

const styles = theme => ({
  rightButton: {
    display: "inline-block"
  }
});

class NotificationsButton extends React.Component {
  state = {
    uploadDialog: true
  };

  render() {
    const { classes, currentSession } = this.props;

    return (
      <React.Fragment>
        {currentSession && (
          <div className={classes.rightButton}>
            <Query
              query={GET_UNREAD_ACTIVITY_COUNT}
              pollInterval={parseInt(
                process.env.UNREAD_ACTIVITY_COUNT_REFRESH_INTERVAL
              )}
            >
              {({ loading, error, data }) => (
                <IconButton color="primary" onClick={this.props.onClick}>
                  {loading || !data || data.unreadActivityCount <= 0 ? (
                    <NotificationsNoneIcon />
                  ) : (
                    <NotificationsIcon />
                  )}
                </IconButton>
              )}
            </Query>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withCurrentSession(withWidth()(NotificationsButton))
);
