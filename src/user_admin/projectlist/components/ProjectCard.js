import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const ProjectCard = props => {
  const { className, project, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        {/* Div for test */}
        <Link to={{ pathname:'/admin/floorplans/' , state:{ id: project.Projid }}}>
          <div className={classes.imageContainer}>
            <img
              alt="Project"
              className={classes.image}
              src={project.Projlogo}

            />
          </div>
          <Typography
            align="center"
            gutterBottom
            variant="h4"
          >
            {project.Projname}
          </Typography>
        </Link>
        <Typography
          align="center"
          variant="body1"
        >
          {project.Projdesc}
        </Typography>
      </CardContent>
    </Card>
  );
};

ProjectCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired
};

export default ProjectCard;
