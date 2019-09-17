import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ScrollArea from 'react-scrollbar';
const styles = theme => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class PointList extends React.Component{
    render(){
        const list = this.props.points.map((point)=>(
            <ListItem button key={point.ID}>
                <ListItemText primary={'ID:' + point.ID+' X:'+ point.Lat + ' Y:' + point.Lon + ' status:' + point.Status}/>
            </ListItem>));
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <ScrollArea
                    speed={0.8}
                    className="area"
                    contentClassName="content"
                    horizontal={false}
                >
                    <List>
                        {list}
                    </List>
                </ScrollArea>
            </div>
        )
    }
}

PointList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PointList)