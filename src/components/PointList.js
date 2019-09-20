import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Scrollbars } from 'react-custom-scrollbars';
import PointsColor from './PointsColor';
const styles = theme => ({
    root: {
        width: '100%',
        height: 400,
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class PointList extends React.Component {

    clickHandler = (id) => {
        document.getElementById('p'+id).click();
    }

    hoverHandler = (id) => {
        let left = document.getElementById('point' + id).style.left;
        let top = document.getElementById('point' + id).style.top;
        document.getElementById('point' + id).setAttribute('style', 'color: red; left:' + left + ';top:' + top)
    }

    hoverOutHandler = (id, status) => {
        let left = document.getElementById('point' + id).style.left;
        let top = document.getElementById('point' + id).style.top;
        let color = PointsColor.setColor(status);
        document.getElementById('point' + id).setAttribute('style', 'color:' + color + ';left:' + left + ';top:' + top)
    }
    render(){
        const list = this.props.points.map((point)=>(
            <ListItem button key={point.ID} onClick={(e)=>{this.clickHandler(point.ID)}} onMouseEnter={() => this.hoverHandler(point.ID)}
            onMouseLeave={() => this.hoverOutHandler(point.ID, point.Status)}>
                <ListItemText primary={'ID:' + point.ID+' X:'+ point.Lat + ' Y:' + point.Lon + ' status:' + point.Status}/>
            </ListItem>));
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Scrollbars style={{ width: 270, height: 800 }}>
                    <List>
                        {list}
                    </List>
                </Scrollbars>
            </div>
        )
    }
}

PointList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PointList)