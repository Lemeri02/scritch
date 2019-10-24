import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Query } from "react-apollo";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Paper from "@material-ui/core/Paper";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import withWidth from "@material-ui/core/withWidth";
import SubscriptionsIcon from "@material-ui/icons/ViewCarousel";
import TipsIcon from "@material-ui/icons/AttachMoney";
import FaveIcon from "@material-ui/icons/Star";
import SettingsIcon from "@material-ui/icons/Settings";
import PetsIcon from "@material-ui/icons/Pets";
import AdsIcon from "@material-ui/icons/BusinessCenter";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import TagIcon from "@material-ui/icons/AssignmentTurnedIn";

import AssetRequestDialog from "./AppDialogs/AssetRequestDialog";
import SettingsDialog from "./AppDialogs/SettingsDialog";
import AdvertiseDialog from "./AppDialogs/AdvertiseDialog";
import MetricsBar from "./AppLayout/MetricsBar";
import SponsorDashboardDialog from "./AppDialogs/SponsorDashboardDialog";
import SponsorDialog from "./AppDialogs/SponsorDialog";
import TipsDialog from "./AppDialogs/TipsDialog";
import SpeciesDialog from "./AppDialogs/SpeciesDialog";
import { GET_RIBBON_ANNOUNCEMENT } from "../queries/announcementQueries";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import HomeIcon from "@material-ui/icons/Home";
import MediaIcon from "@material-ui/icons/Photo";
import FursuitIcon from "@material-ui/icons/AccessibilityNew";
import MakerIcon from "@material-ui/icons/Build";
import EventIcon from "@material-ui/icons/Business";
import AddIcon from "@material-ui/icons/Add";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";

import { Link, withRouter } from "react-router-dom";

import withCurrentSession from "./withCurrentSession";

const styles = theme => {
  return {
    drawerSpacer: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1
    },
    profile: {
      display: "flex",
      width: "100%",
      position: "relative",
      justifyContent: "flex-start",
      padding: theme.spacing.unit * 2
    },
    bannerPlaceholder: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0.4
    },
    userInfo: {
      display: "flex",
      zIndex: 1,
      alignItems: "center"
    },
    infoText: {
      marginLeft: theme.spacing.unit * 2
    },
    nested: {
      paddingLeft: theme.spacing.unit * 4
    },
    text: {
      color: theme.palette.text.primary
    },
    link: {
      textDecoration: "none"
    },
    paper: {
      padding: theme.spacing.unit * 2,
      margin: theme.spacing.unit * 2
    },
    oversizeTooltip: {
      fontSize: "1.5em"
    }
  };
};

class DrawerMenuRemake extends React.Component {
  state = {
    settingsDialog: false,
    sponsorDialog: false,
    sponsorDashboardDialog: false,
    tipsDialog: false,
    databaseList: false,
    sponsorMenu: false,
    snack: false,
    assetDialog: false,
    adsDialog: false,
    speciesDialog: false
  };

  render() {
    const { classes, location, currentSession, width } = this.props;
    const user =
      currentSession && currentSession.user ? currentSession.user : null;

    if (user && user.sponsor)
      var sponsorLimit = new Date(user.sponsor.limit * 1000);

    return (
      <React.Fragment>
        <div
          className={classes.drawerSpacer}
          style={{
            justifyContent:
              width === "lg" || width === "xl"
                ? "space-between"
                : "space-between"
          }}
        >
          {currentSession && currentSession.user.suspendedUser && (
            <div>
              <List disablePadding={width !== "lg" && width !== "xl"}>
                <ListItem
                  button
                  selected={
                    location.pathname === "/" ||
                    location.pathname === "/pictures"
                  }
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/"
                    });
                    if (this.props.onClose) {
                      this.props.onClose();
                    }
                  }}
                >
                  <ListItemIcon className={classes.text} color="secondary">
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Home"
                    primaryTypographyProps={{ className: classes.text }}
                  />
                </ListItem>
              </List>
              <div>
                <List disablePadding={width !== "lg" && width !== "xl"}>
                  {currentSession && !this.props.disableSettings && (
                    <React.Fragment>
                      <ListItem
                        button
                        onClick={() => {
                          this.props.history.push({
                            pathname: "/announcements"
                          });
                          if (this.props.onClose) {
                            this.props.onClose();
                          }
                        }}
                      >
                        <ListItemIcon className={classes.text}>
                          {currentSession &&
                          user.unreadAnnouncementsCount > 0 ? (
                            <Badge
                              badgeContent={user.unreadAnnouncementsCount}
                              color="primary"
                            >
                              <AnnouncementIcon />
                            </Badge>
                          ) : (
                            <AnnouncementIcon />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary="Announcements"
                          primaryTypographyProps={{ className: classes.text }}
                        />
                      </ListItem>
                      <Divider />
                      <ListItem
                        button
                        onClick={() => this.setState({ settingsDialog: true })}
                      >
                        <ListItemIcon>
                          <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Settings"
                          primaryTypographyProps={{
                            noWrap: true
                          }}
                        />
                      </ListItem>
                    </React.Fragment>
                  )}
                </List>
              </div>
            </div>
          )}
          {(!currentSession ||
            (currentSession && !currentSession.user.suspendedUser)) && (
            <React.Fragment>
              <div>
                <List disablePadding={width !== "lg" && width !== "xl"}>
                  <React.Fragment>
                    <Link to="/" className={classes.link}>
                      <ListItem button selected={location.pathname === "/"}>
                        <ListItemIcon
                          className={classes.text}
                          color="secondary"
                        >
                          <HomeIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Home"
                          primaryTypographyProps={{ className: classes.text }}
                        />
                      </ListItem>
                    </Link>
                    <Link to="/pictures" className={classes.link}>
                      <ListItem
                        button
                        selected={location.pathname === "/pictures"}
                      >
                        <ListItemIcon
                          className={classes.text}
                          color="secondary"
                        >
                          <MediaIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Media"
                          primaryTypographyProps={{ className: classes.text }}
                        />
                      </ListItem>
                    </Link>
                    <Link to="/fursuits" className={classes.link}>
                      <ListItem
                        button
                        selected={location.pathname === "/fursuits"}
                      >
                        <ListItemIcon
                          className={classes.text}
                          color="secondary"
                        >
                          <FursuitIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Fursuits"
                          primaryTypographyProps={{ className: classes.text }}
                        />
                      </ListItem>
                    </Link>
                    <Link to="/makers" className={classes.link}>
                      <ListItem
                        button
                        selected={location.pathname === "/makers"}
                      >
                        <ListItemIcon
                          className={classes.text}
                          color="secondary"
                        >
                          <MakerIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Makers"
                          primaryTypographyProps={{ className: classes.text }}
                        />
                      </ListItem>
                    </Link>
                    <Link to="/events" className={classes.link}>
                      <ListItem
                        button
                        selected={location.pathname === "/events"}
                      >
                        <ListItemIcon
                          className={classes.text}
                          color="secondary"
                        >
                          <EventIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Events"
                          primaryTypographyProps={{ className: classes.text }}
                        />
                      </ListItem>
                    </Link>
                    {user && (
                      <ListItem
                        button
                        onClick={() => {
                          this.setState({ assetDialog: true });
                        }}
                      >
                        <ListItemIcon
                          className={classes.text}
                          color="secondary"
                        >
                          <AddIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Create"
                          primaryTypographyProps={{ className: classes.text }}
                        />
                      </ListItem>
                    )}
                    {currentSession && (
                      <React.Fragment>
                        <Link to="/tag" className={classes.link}>
                          <ListItem
                            button
                            selected={location.pathname === "/tag"}
                          >
                            <ListItemIcon
                              className={classes.text}
                              color="secondary"
                            >
                              <TagIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="Tag Media"
                              primaryTypographyProps={{
                                className: classes.text
                              }}
                            />
                          </ListItem>
                        </Link>
                        <Link to="/subscriptions" className={classes.link}>
                          <ListItem
                            button
                            selected={location.pathname === "/subscriptions"}
                          >
                            <ListItemIcon
                              className={classes.text}
                              color="secondary"
                            >
                              <SubscriptionsIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="Subscriptions"
                              primaryTypographyProps={{
                                className: classes.text
                              }}
                            />
                          </ListItem>
                        </Link>
                        <Link to="/favorites" className={classes.link}>
                          <ListItem
                            button
                            selected={location.pathname === "/favorites"}
                          >
                            <ListItemIcon
                              className={classes.text}
                              color="secondary"
                            >
                              <FaveIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="Favorites"
                              primaryTypographyProps={{
                                className: classes.text
                              }}
                            />
                          </ListItem>
                        </Link>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                </List>
              </div>

              {false && (
                <Query query={GET_RIBBON_ANNOUNCEMENT}>
                  {({ loading, error, data }) => {
                    if (loading || error || !data) return null;
                    if (data && data.ribbonAnnouncement) {
                      return (
                        <div>
                          <Paper className={classes.paper}>
                            <Typography>
                              {data.ribbonAnnouncement.body}
                            </Typography>
                          </Paper>
                        </div>
                      );
                    }
                    return null;
                  }}
                </Query>
              )}
              {false && width !== "xl" && (
                <div>
                  <MetricsBar
                    openSpeciesDialog={() =>
                      this.setState({ speciesDialog: true })
                    }
                  />
                </div>
              )}
              {user && true && (
                <div>
                  {user && user.sponsor && (
                    <ListItem
                      button
                      onClick={() =>
                        this.setState({ sponsorDashboardDialog: true })
                      }
                    >
                      <ListItemIcon className={classes.text} color="secondary">
                        <PetsIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Sponsorship"
                        primaryTypographyProps={{ className: classes.text }}
                      />
                    </ListItem>
                  )}
                  {user && !user.sponsor && (
                    <div>
                      <ListItem
                        button
                        onClick={() => {
                          this.setState({
                            sponsorDialog: !this.state.sponsorDialog
                          });
                        }}
                      >
                        <ListItemIcon
                          className={classes.text}
                          color="secondary"
                        >
                          <PetsIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Become a Sponsor!"
                          primaryTypographyProps={{
                            className: classes.text
                          }}
                        />
                      </ListItem>
                    </div>
                  )}
                  {user && (
                    <ListItem
                      button
                      onClick={() => {
                        this.setState({ adsDialog: true });
                      }}
                    >
                      <ListItemIcon className={classes.text} color="secondary">
                        <AdsIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Advertise with Scritch"
                        primaryTypographyProps={{
                          className: classes.text
                        }}
                      />
                    </ListItem>
                  )}
                  {user && (
                    <ListItem
                      button
                      onClick={() => {
                        this.setState({ tipsDialog: true });
                      }}
                    >
                      <ListItemIcon className={classes.text} color="secondary">
                        <TipsIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Tip Jar"
                        primaryTypographyProps={{
                          className: classes.text
                        }}
                      />
                    </ListItem>
                  )}
                </div>
              )}
              <div>
                <List disablePadding={width !== "lg" && width !== "xl"}>
                  {currentSession && !this.props.disableSettings && (
                    <React.Fragment>
                      <Link to="/announcements" className={classes.link}>
                        <ListItem button>
                          <ListItemIcon className={classes.text}>
                            {currentSession &&
                            user.unreadAnnouncementsCount > 0 ? (
                              <Badge
                                badgeContent={user.unreadAnnouncementsCount}
                                color="primary"
                              >
                                <AnnouncementIcon />
                              </Badge>
                            ) : (
                              <AnnouncementIcon />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary="Annoucements"
                            primaryTypographyProps={{
                              className: classes.text
                            }}
                          />
                        </ListItem>
                      </Link>
                      <Divider />
                      <ListItem
                        button
                        onClick={() => this.setState({ settingsDialog: true })}
                      >
                        <ListItemIcon>
                          <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Settings"
                          primaryTypographyProps={{
                            className: classes.text
                          }}
                        />
                      </ListItem>
                    </React.Fragment>
                  )}
                  {!currentSession && !this.props.disableSettings && (
                    <React.Fragment>
                      <ListItem
                        button
                        onClick={() => {
                          this.props.history.push({
                            pathname: "/announcements"
                          });
                          if (this.props.onClose) {
                            this.props.onClose();
                          }
                        }}
                      >
                        <ListItemIcon className={classes.text}>
                          <AnnouncementIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Annoucements"
                          primaryTypographyProps={{
                            className: classes.text
                          }}
                        />
                      </ListItem>
                    </React.Fragment>
                  )}
                </List>
              </div>
            </React.Fragment>
          )}
        </div>
        <SettingsDialog
          open={this.state.settingsDialog}
          onClose={() => {
            this.setState({ settingsDialog: false });
            if (this.props.onClose) {
              this.props.onClose();
            }
          }}
        />
        <TipsDialog
          open={this.state.tipsDialog}
          onClose={() => {
            this.setState({ tipsDialog: false });
            if (this.props.onClose) {
              this.props.onClose();
            }
          }}
        />
        <SponsorDialog
          open={this.state.sponsorDialog}
          onClose={() => {
            this.setState({ sponsorDialog: false });
            if (this.props.onClose) {
              this.props.onClose();
            }
          }}
        />
        <SpeciesDialog
          open={this.state.speciesDialog}
          onClose={() => {
            this.setState({ speciesDialog: false });
            if (this.props.onClose) {
              this.props.onClose();
            }
          }}
        />
        <AdvertiseDialog
          open={this.state.adsDialog}
          onClose={() => {
            this.setState({ adsDialog: false });
            if (this.props.onClose) {
              this.props.onClose();
            }
          }}
        />
        <AssetRequestDialog
          open={this.state.assetDialog}
          keepAssetType={null}
          onClose={() => {
            this.setState({ assetDialog: false });
            if (this.props.onClose) {
              this.props.onClose();
            }
          }}
          submitSnack={() => this.setState({ snack: true })}
          assetType="Asset"
        />
        <SponsorDashboardDialog
          open={this.state.sponsorDashboardDialog}
          onClose={() => {
            this.setState({ sponsorDashboardDialog: false });
            if (this.props.onClose) {
              this.props.onClose();
            }
          }}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.snack}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Request Submitted!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={() => this.setState({ snack: false })}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(
  withStyles(styles)(withCurrentSession(withWidth()(DrawerMenuRemake)))
);
