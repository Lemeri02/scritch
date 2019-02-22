import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query, withApollo } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import queryString from "query-string";

import Typography from "@material-ui/core/Typography";
import { Link, withRouter } from "react-router-dom";

import Background from "../../photo.jpg";

const styles = theme => ({
  card: {
    width: "100%",
    borderRadius: 0
  },
  verticalMedia: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0
  },
  cardMediaContainer: {
    position: "relative",
    paddingTop: "56%"
  },
  content: {
    textAlign: "center",
    padding: theme.spacing.unit * 0.1
  },
  text: {
    fontWeight: 200
  },
  subtext: {
    fontSize: 15,
    fontWeight: 200
  }
});

class FursuitCard extends React.Component {
  state = {};

  renderMedia() {
    const { classes, fursuit, horizontal, width, client } = this.props;

    return (
      <div className={classes.cardMediaContainer}>
        <CardMedia
          className={classes.verticalMedia}
          image={fursuit.avatar ? fursuit.avatar : require("../../photo.jpg")} //{fursuit.thumbnail} TODO
          title={fursuit.name}
        />
      </div>
    );
  }

  renderContent() {
    const { classes, fursuit, horizontal } = this.props;

    return (
      <CardContent className={classes.content}>
        <Typography
          gutterBottom
          variant="h6"
          component="h4"
          className={classes.text}
          noWrap
        >
          {fursuit.name}
        </Typography>
        <Typography
          gutterBottom
          variant="h6"
          component="h6"
          className={classes.subtext}
          noWrap
        >
          {fursuit.makers[0] && fursuit.makers[0].name}
        </Typography>
      </CardContent>
    );
  }

  renderVertical() {
    const { classes, fursuit } = this.props;

    return (
      <Card className={classes.card} elevation={0}>
        <CardActionArea
          onClick={() => {
            this.props.openFursuit(fursuit);
          }}
        >
          {this.renderMedia()}
          {this.renderContent()}
        </CardActionArea>
      </Card>
    );
  }

  render() {
    const {} = this.props;

    return this.renderVertical();
  }
}

FursuitCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withWidth()(withApollo(FursuitCard)));