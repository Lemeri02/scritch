import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ResponsiveDialog from "../Global/ResponsiveDialog";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import CloseIcon from "@material-ui/icons/Close";
import DownloadIcon from "@material-ui/icons/SaveAlt";
import OkIcon from "@material-ui/icons/Check";
import OutlinedFlag from "@material-ui/icons/OutlinedFlag";

import withCurrentSession from "../withCurrentSession";
import { withStyles } from "@material-ui/core/styles";
import GlobalProgress from "../Global/GlobalProgress";
import { GET_MEDIUM } from "../../queries/mediaQueries";
import { Query, Mutation } from "react-apollo";
import {
  TAG_LOCK_MEDIUM,
  TAG_UNLOCK_MEDIUM
} from "../../queries/mediaMutations";
import countFormat from "../../countFormat";

import ReportDialog from "../AppDialogs/ReportDialog";
import TagReportDialog from "../AppDialogs/TagReportDialog";
import ExifDialog from "../AppDialogs/ExifDialog";
import DownloadDialog from "../AppDialogs/DownloadDialog";
import LikeButton from "./LikeButton";
import FaveButton from "./FaveButton";
import FursuitMiniCard from "../Fursuits/FursuitMiniCard";
import EditMediumDialog from "./EditMediumDialog";
import TagDialog from "../TagDialog";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import { withWidth } from "@material-ui/core";

const styles = theme => ({
  dialogTitleRoot: {
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  dataLink: {
    textDecoration: "none",
    color: theme.palette.secondary.main
  },
  text: {
    fontWeight: 200
  },
  masterGridOnLoad: {
    padding: theme.spacing.unit * 4,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  masterGrid: {
    padding: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  dataGrid: {
    padding: theme.spacing.unit,
    width: "100%",
    overflowY: "scroll",
    height: "fit-content",
    display: "flex"
  },
  flexSection: {
    display: "flex",
    justifyContent: "space-between"
  },
  flexSectionCentered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  flexSectionSpacedCentered: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  mediaH: {
    width: "100%",
    maxHeight: "calc(100vh - 56px)",
    objectFit: "contain"
  },
  mediaHflip: {
    transform: "rotate(180deg)",
    width: "100%",
    maxHeight: "calc(100vh - 56px)",
    objectFit: "contain"
  },
  mediaVleft: {
    transform: "rotate(90deg)",
    width: "calc(100vh - 56px)",
    height: "calc(100vh - 56px)",
    maxHeight: "calc(100vh - 56px)",
    objectFit: "contain",
    margin: "auto",
    display: "block"
  },
  mediaVright: {
    transform: "rotate(-90deg)",
    width: "calc(100vh - 56px)",
    height: "calc(100vh - 56px)",
    maxHeight: "calc(100vh - 56px)",
    objectFit: "contain",
    margin: "auto",
    display: "block"
  },
  copied: {
    color: theme.palette.primary.main
  },
  dataFieldTitle: {
    maxWidth: "40vw",
    fontWeight: 200
  },
  innerDialogCloseButton: {
    position: "absolute",
    right: theme.spacing.unit * 1,
    top: theme.spacing.unit * 1,
    color: theme.palette.grey[500]
  },
  masterGridBackdrop: {
    padding: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"
  },
  fursuitLink: {
    textDecoration: "none"
  },
  dialogHeight: {
    height: "100%"
  },
  sideHeight: {
    maxHeight: "100%"
  }
});

const Spacer = () => <div style={{ padding: 8 }} />;

const FatDivider = () => (
  <hr style={{ borderTop: "1px solid", width: "80%", color: "grey" }} />
);

const DataDialog = ({ classes, medium, open, onClose }) => {
  return (
    <ResponsiveDialog open={open} onClose={onClose} size={600}>
      <DialogTitle className={classes.dialogTitleRoot}>
        <Typography variant="h6">Media Information</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          className={classes.innerDialogCloseButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {medium.photographerSlug && (
          <Grid item>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              color="primary"
            >
              Captured by
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={classes.dataFieldTitle}
            >
              <Link
                to={`/${medium.photographerSlug}`}
                target="_blank"
                className={classes.dataLink}
              >
                {" "}
                {medium.photographerSlug}
              </Link>
            </Typography>
          </Grid>
        )}
        <Spacer />
        {medium.photographerString && (
          <Grid item>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              color="primary"
            >
              Captured by
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={classes.dataFieldTitle}
            >
              {medium.photographerString}
            </Typography>
          </Grid>
        )}
        {medium.edition && (
          <Grid item>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              color="primary"
            >
              Event (Edition)
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={classes.dataFieldTitle}
            >
              <Link
                to={`/events/${medium.edition.event.slug}?edition_id=${medium.edition.id}&edition_name=${medium.edition.name}`}
                target="_blank"
                className={classes.dataLink}
              >
                {medium.edition.event.name} ({medium.edition.name})
              </Link>
            </Typography>
          </Grid>
        )}
        <Spacer />
        {medium.subEvent && (
          <Grid item>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              color="primary"
            >
              Sub Event
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={classes.dataFieldTitle}
            >
              {medium.subEvent.name}
            </Typography>
          </Grid>
        )}
        <Spacer />
        {medium.category && (
          <Grid item>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              color="primary"
            >
              Category
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="h2"
              className={classes.dataFieldTitle}
            >
              {medium.category.name}
            </Typography>
          </Grid>
        )}
      </DialogContent>
    </ResponsiveDialog>
  );
};

const DataSection = ({ classes, medium }) => {
  const [dataOpen, setDataOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

  return (
    <React.Fragment>
      <DataDialog
        classes={classes}
        medium={medium}
        open={dataOpen}
        onClose={() => setDataOpen(false)}
      />
      <DownloadDialog
        open={downloadOpen}
        onClose={() => setDownloadOpen(false)}
        medium={medium}
      />
      <Grid item xs={12} className={classes.flexSectionCentered}>
        <Button onClick={() => setDataOpen(true)} variant="outlined">
          Display Media Information
        </Button>
      </Grid>
      <Grid item xs={12} className={classes.flexSectionSpacedCentered}>
        <div>
          <LikeButton medium={medium} />
          <FaveButton medium={medium} />
        </div>
        <div>
          <Tooltip title="Download Media">
            <IconButton onClick={() => setDownloadOpen(true)} color="secondary">
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Grid>
    </React.Fragment>
  );
};

const MediumActionButton = ({ currentSession, classes, medium }) => {
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <React.Fragment>
      <Mutation
        mutation={TAG_UNLOCK_MEDIUM}
        onCompleted={() => {
          setEditDialogOpen(false);
        }}
        onError={() => {
          setEditDialogOpen(false);
        }}
      >
        {(tagUnlockMedium, { data, error }) => (
          <EditMediumDialog
            open={editDialogOpen}
            onClose={() => {
              tagUnlockMedium({
                variables: {
                  input: {
                    id: medium.id
                  }
                }
              });
            }}
            mediumId={medium.id}
          />
        )}
      </Mutation>
      <Mutation
        mutation={TAG_UNLOCK_MEDIUM}
        onCompleted={() => {
          setTagDialogOpen(false);
        }}
        onError={() => {
          setTagDialogOpen(false);
        }}
      >
        {(tagUnlockMedium, { data, error }) => (
          <TagDialog
            open={tagDialogOpen}
            onClose={() => {
              tagUnlockMedium({
                variables: {
                  input: {
                    id: medium.id
                  }
                }
              });
            }}
            mediumId={medium.id}
            noReload={true}
          />
        )}
      </Mutation>
      <Grid item xs={12} className={classes.flexSectionCentered}>
        {currentSession &&
          (medium.user.id === currentSession.user.id ||
            currentSession.user.moderator) && (
            <Mutation
              mutation={TAG_LOCK_MEDIUM}
              update={cache => {}}
              onCompleted={() => {
                setEditDialogOpen(true);
              }}
              onError={() => {
                setEditDialogOpen(true);
              }}
            >
              {(tagLockMedium, { data }) => (
                <Button
                  variant="outlined"
                  onClick={() => {
                    tagLockMedium({
                      variables: {
                        input: {
                          id: medium.id
                        }
                      }
                    });
                  }}
                >
                  Edit picture
                </Button>
              )}
            </Mutation>
          )}
        {currentSession &&
          medium.user.id !== currentSession.user.id &&
          medium.completion != 100 && (
            <Mutation
              mutation={TAG_LOCK_MEDIUM}
              update={cache => {}}
              onCompleted={() => {
                setTagDialogOpen(true);
              }}
              onError={() => {
                setTagDialogOpen(true);
              }}
            >
              {(tagLockMedium, { data }) => (
                <Button
                  variant="outlined"
                  onClick={() => {
                    tagLockMedium({
                      variables: {
                        input: {
                          id: medium.id
                        }
                      }
                    });
                  }}
                >
                  Tag Picture
                </Button>
              )}
            </Mutation>
          )}
      </Grid>
    </React.Fragment>
  );
};

const TagSection = ({ classes, medium }) => {
  const [tagReportOpen, setTagReportOpen] = useState(false);

  return (
    <React.Fragment>
      <TagReportDialog
        open={tagReportOpen}
        onClose={() => setTagReportOpen(false)}
        medium={medium}
      />
      {medium.fursuits.length != 0 && (
        <React.Fragment>
          <Grid item xs={12} className={classes.flexSection}>
            <Grid
              container
              spacing={8}
              className={classes.flexSectionSpacedCentered}
            >
              <div>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  color="primary"
                >
                  {"Fursuits"}
                </Typography>
              </div>
              <div>
                <div className={classes.tagReportButton}>
                  <Button
                    variant="outlined"
                    onClick={() => setTagReportOpen(true)}
                  >
                    Report Wrong Tags
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.flexSection}>
            <Grid
              container
              spacing={8}
              className={classes.flexSectionSpacedCentered}
            >
              {medium.fursuits.map(fursuit => (
                <Grid item xs={6} sm={3} md={6} key={fursuit.id}>
                  <Link
                    target="_blank"
                    to={`/fursuits/${fursuit.slug}`}
                    className={classes.fursuitLink}
                  >
                    <FursuitMiniCard onClick={() => {}} fursuit={fursuit} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const CommentSection = ({ currentSession, classes, medium }) => {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        {currentSession && (
          <React.Fragment>
            <Typography gutterBottom variant="h6" component="h3">
              {countFormat(medium.commentsCount, "comment", "comments")}
            </Typography>
            {currentSession ? (
              <CommentForm medium={medium} />
            ) : (
              <Typography gutterBottom variant="caption">
                {"You must be connected to write a comment."}
              </Typography>
            )}
            <Comments
              medium={medium}
              parent={null}
              commentsCount={medium.commentsCount}
            />
          </React.Fragment>
        )}
      </Grid>
    </React.Fragment>
  );
};

class MediumDialog extends React.Component {
  state = {
    copied: false,
    reportDialog: false,
    exifDialog: false,
    downloadDialog: false,
    tagReportDialog: false
  };

  render() {
    const {
      classes,
      width,
      open,
      onClose,
      mediumId,
      currentSession
    } = this.props;
    if (!mediumId) return null;

    return (
      <ResponsiveDialog open={open} onClose={onClose} size={1280}>
        <DialogContent
          style={{
            padding: 0,
            width: "100%"
          }}
        >
          <Query query={GET_MEDIUM} variables={{ id: mediumId }}>
            {({ error, loading, data }) => {
              if (error || loading) {
                return (
                  <Grid container spacing={24}>
                    <Grid
                      item
                      xs={12}
                      lg={9}
                      className={classes.masterGridOnLoad}
                    >
                      <CircularProgress />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      lg={3}
                      className={classes.masterGridOnLoad}
                    >
                      <CircularProgress />
                    </Grid>
                  </Grid>
                );
              }
              const medium = data ? data.medium : null;

              if (!medium) {
                return (
                  <Grid container spacing={8}>
                    <Grid item xs={12} className={classes.masterGridOnLoad}>
                      <Typography variant="h6">
                        Something went wrong :(
                      </Typography>
                    </Grid>
                  </Grid>
                );
              }

              var orientation;
              if (medium) {
                if (medium.exif && JSON.parse(medium.exif).Orientation === "6")
                  orientation = classes.mediaVleft;
                else if (
                  medium.exif &&
                  JSON.parse(medium.exif).Orientation === "8"
                )
                  orientation = classes.mediaVright;
                else if (
                  medium.exif &&
                  JSON.parse(medium.exif).Orientation === "3"
                )
                  orientation = classes.mediaHflip;
                else orientation = classes.mediaH;
              } else orientation = classes.mediaH;

              return (
                <React.Fragment>
                  <Grid container spacing={0}>
                    <Grid
                      item
                      xs={12}
                      lg={9}
                      className={classes.masterGridBackdrop}
                    >
                      {medium.resized.substr(
                        medium.resized.lastIndexOf(".") + 1
                      ) === "mp4" && (
                        <video
                          loop="loop"
                          autoplay="autoplay"
                          onContextMenu={e => {
                            e.preventDefault();
                          }}
                          className={orientation}
                          src={medium.resized}
                        />
                      )}
                      {medium.resized.substr(
                        medium.resized.lastIndexOf(".") + 1
                      ) !== "mp4" && (
                        <img
                          onClick={() => {}}
                          onContextMenu={e => {
                            e.preventDefault();
                          }}
                          className={orientation}
                          src={`${medium.resized}`}
                          title={medium.title}
                        />
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      lg={3}
                      className={classes.dataGrid}
                      style={{
                        maxHeight:
                          width === "xl" || width === "lg"
                            ? medium.height / (medium.width / 960)
                            : "100%"
                      }}
                    >
                      <Grid container spacing={16}>
                        <Grid item xs={12} className={classes.flexSection}>
                          {true && (
                            <CopyToClipboard
                              text={`${process.env.SITE_URL}/pictures/${medium.id}`}
                              onCopy={() => {
                                this.setState({ copied: true });
                                setTimeout(() => {
                                  this.setState({ copied: false });
                                }, 3000);
                              }}
                            >
                              <Button
                                variant="outlined"
                                size="small"
                                className={
                                  this.state.copied ? classes.copied : null
                                }
                              >
                                {this.state.copied
                                  ? "Copied to Clipboard"
                                  : "Get Link"}
                              </Button>
                            </CopyToClipboard>
                          )}
                          {currentSession && (
                            <Tooltip title="Report Media">
                              <IconButton
                                onClick={() =>
                                  this.setState({ reportDialog: true })
                                }
                              >
                                <OutlinedFlag />
                              </IconButton>
                            </Tooltip>
                          )}
                          <IconButton onClick={onClose} autoFocus>
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                        <FatDivider />
                        <MediumActionButton
                          currentSession={currentSession}
                          classes={classes}
                          medium={medium}
                        />
                        <DataSection classes={classes} medium={medium} />
                        <FatDivider />
                        <TagSection classes={classes} medium={medium} />
                        <FatDivider />
                        <CommentSection
                          currentSession={currentSession}
                          classes={classes}
                          medium={medium}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <ReportDialog
                    open={this.state.reportDialog}
                    onClose={() => this.setState({ reportDialog: false })}
                    resource="medium"
                    resourceId={medium.id}
                  />
                  <TagReportDialog
                    open={this.state.tagReportDialog}
                    onClose={() => this.setState({ tagReportDialog: false })}
                    medium={medium}
                  />
                  <ExifDialog
                    open={this.state.exifDialog}
                    onClose={() => this.setState({ exifDialog: false })}
                    medium={medium}
                  />
                  <DownloadDialog
                    open={this.state.downloadDialog}
                    onClose={() => this.setState({ downloadDialog: false })}
                    medium={medium}
                  />
                </React.Fragment>
              );
            }}
          </Query>
        </DialogContent>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(
  withRouter(withCurrentSession(withWidth()(MediumDialog)))
);
