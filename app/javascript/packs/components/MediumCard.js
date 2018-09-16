import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { Link, withRouter } from 'react-router-dom';
import { keyToUrl } from '../mediaService';
import timeAgo from '../timeAgo';

const styles = theme => ({
  card: {
    width: '100%',
    borderRadius: 0,
  },
  horizontalCard: {
    display: 'flex',
  },
  horizontalContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  verticalMedia: {
    width: '100%',
    height: 300
  },
  horizontalMediaContainer: {
    width: '60%',
    height: 340
  },
  horizontalMedia: {
    width: '100%',
    height: '100%',
  },
  horizontalInfos: {
    flex: 1
  }
});

class MediumCard extends React.Component {
  state = {
    thumbnailKey: this.props.medium.thumbnailKey
  }

  renderHeader() {
    const { classes, medium } = this.props;

    return (
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={medium.user.name}
        subheader={timeAgo.format(new Date(medium.createdAt))}
      />
    );
  }

  renderMedia() {
    const { classes, medium, horizontal } = this.props;

    return (
      <CardMedia
        className={horizontal ? classes.horizontalMedia : classes.verticalMedia}
        image={keyToUrl(this.state.thumbnailKey)}
        title={medium.title}
        onMouseEnter={() => this.setState({ thumbnailKey: medium.previewKey })}
        onMouseLeave={() => this.setState({ thumbnailKey: medium.thumbnailKey })}
      />
    );
  }

  renderVertical() {
    const { classes, medium } = this.props;

    return (
      <Card className={classes.card} elevation={0}>
        {this.renderHeader()}
        <CardActionArea component={(props) => <Link to={`/${medium.id}`} {...props} />}>
          {this.renderMedia()}
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="headline" component="h2" className={classes.text}>
              {medium.title}
            </Typography>
            <Typography component="p" className={classes.text}>
              {medium.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }

  renderHorizontal() {
    const { classes, medium } = this.props;

    return (
      <Card className={[classes.card, classes.horizontalCard]} elevation={0}>
        <CardActionArea component={(props) => <Link to={`/${medium.id}`} {...props} />} className={classes.horizontalMediaContainer}>
          {this.renderMedia()}
        </CardActionArea>
        <div className={classes.horizontalContent}>
          {this.renderHeader()}
          <CardActionArea component={(props) => <Link to={`/${medium.id}`} {...props} />} className={classes.horizontalInfos}>
            <CardContent className={classes.content}>
              <Typography gutterBottom variant="headline" component="h2" className={classes.text}>
                {medium.title}
              </Typography>
              <Typography component="p" className={classes.text}>
                {medium.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </div>
      </Card>
    )
  }

  render() {
    const { horizontal } = this.props;

    if (horizontal) {
      return this.renderHorizontal();
    }
    return this.renderVertical();
  }
}

MediumCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediumCard);
