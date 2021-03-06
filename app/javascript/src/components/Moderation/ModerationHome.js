import React, { useState } from "react";
import PageTitle from "../Global/PageTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import withCurrentModerator from "../withCurrentModerator";

const styles = (theme) => ({
  font: {
    fontWeight: 200,
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    textAlign: "center",
  },
  linkTypo: {
    fontWeight: 200,
    color: theme.palette.primary.main,
  },
  centeredTitle: {
    textAlign: "center",
  },
  root: {
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
  },
  rootMobile: {
    padding: theme.spacing(1),
  },
  titlePadder: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  titlePadderMobile: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  cardLink: {
    textDecoration: "none",
  },
  card: {
    height: "100%",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.3)",
    },
  },
  grid: {
    height: "100%",
  },
  overlay: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    margin: 12,
    background: "rgba(0, 0, 0, 0)",
    "&:hover": {
      background: "rgba(0, 0, 0, 0.3)",
    },
  },
  hiModerator: {
    textAlign: "center",
    fontWeight: 200,
  },
});

const Padder = () => <div style={{ padding: 8 }} />;

const moderationRouter = [
  {
    path: "/react_moderation/adverts",
    title: "Adverts",
    subtitle: "Manage and review advertisement submissions",
    capabilities: ["adverts"],
  },
  {
    path: "/react_moderation/analytics",
    title: "Analytics",
    subtitle: "Access Scritch numbers data and analytics",
    capabilities: ["analytics"],
  },
  {
    path: "/react_moderation/announcements",
    title: "Announcements",
    subtitle: "Manage, edit, publish Scritch announcements",
    capabilities: ["announcements"],
  },
  {
    path: "/react_moderation/assets",
    title: "Assets",
    subtitle: "Manage, edit, create all types of Scritch Assets",
    capabilities: ["assets"],
  },
  {
    path: "/react_moderation/claims",
    title: "Claims",
    subtitle: "View and respond to Asset Claimed by Users",
    capabilities: ["fursuit_claims", "maker_claims"],
  },
  {
    path: "/react_moderation/moderators",
    title: "Moderators",
    subtitle: "Create, manage and edit Moderators rights and access",
    capabilities: ["moderators"],
  },
  {
    path: "/react_moderation/reports",
    title: "Reports",
    subtitle: "View and respond to all report types on Scritch",
    capabilities: ["reports"],
  },
  {
    path: "/react_moderation/requests",
    title: "Requests",
    subtitle: "View and respond to Asset Requests by Users",
    capabilities: ["assets"],
  },
  {
    path: "/react_moderation/sponsors",
    title: "Sponsors",
    subtitle: "Manage and review Scritch Sponsors data",
    capabilities: ["sponsors"],
  },
  {
    path: "/react_moderation/suspended_users",
    title: "Suspended Users",
    subtitle: "Manage, edit, and view currently Suspended Users on Scritch",
    capabilities: ["suspended_users"],
  },
  {
    path: "/react_moderation/tickets",
    title: "Tickets",
    subtitle: "View and respond to Scritch ticket inquiries",
    capabilities: ["tickets"],
  },
];

function ModerationHome({ classes, width, currentModerator }) {
  const [homeTab, setHomeTab] = useState("latest");
  let typoSize = width === "xs" || width === "sm" ? "h5" : "h4";

  return (
    <React.Fragment>
      <PageTitle>Scritch Moderation - Home</PageTitle>
      <Typography variant="h3" className={classes.hiModerator}>
        Hi, {currentModerator.name}!
      </Typography>
      <Padder />
      <Padder />
      <Grid container spacing={width === "xl" || width === "lg" ? 3 : 1}>
        {moderationRouter.map((route) => {
          if (currentModerator.capabilities.some((value) => route.capabilities.indexOf(value) >= 0))
            return (
              <Grid item xs={12} md={6} lg={3} className={classes.grid} key={route.title}>
                <Link to={route.path} className={classes.cardLink}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography gutterBottom variant="h5">
                        {route.title}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {route.subtitle}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
        })}
      </Grid>
    </React.Fragment>
  );
}

export default withStyles(styles)(withWidth()(withCurrentModerator(ModerationHome)));
