import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Point from '@material-ui/icons/FiberManualRecord'
import Icon from '@material-ui/core/Icon';

import PointsColor from './PointsColor';

const style = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
    },

});

class Legend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open
        });
        this.props.setStatus(!this.state.open);

    };


    render() {
        const { classes } = this.props;
        // const status = ["Requested", "New", "Assigned", "Uploaded", "Done", "Reject", "Denied", "Deleted"];
        const legend = [
            { status: "Requested", icon: "brightness_low_rounded_icon" },
            { status: "New", icon: "star_border_rounded_icon" },
            { status: "Assigned", icon: "star_rounded_icon" },
            { status: "Uploaded", icon: "camera_alt_rounded_icon" },
            { status: "Done", icon: "check_circle_rounded_icon" },
            { status: "Reject", icon: "location_off_rounded_icon" },
            { status: "Denied", icon: "print_disabled_rounded_icon" },
            { status: "Deleted", icon: "cancel_rounded_icon" },
        ]
        return (
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
            >
                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                        <MoreVertIcon />
                    </ListItemIcon>
                    <ListItemText primary="Legend" />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {this.props.cbmode ?
                            //colorblind mode
                            legend.map(function (l, index) {
                                return <ListItem button className={classes.nested} key={index}>
                                    <Icon style={{
                                        color: PointsColor.setColor(l.status),
                                    }}>{l.icon}</Icon>
                                    <ListItemText primary={l.status} style={{ paddingLeft: 10, }} />
                                </ListItem>
                            })

                            :
                            //normal mode
                            legend.map(function (l, index) {
                                return <ListItem button className={classes.nested} key={index}>
                                    <Point style={{
                                        color: PointsColor.setColor(l.status),
                                    }} />
                                    <ListItemText primary={l.status} style={{ paddingLeft: 10, }} />
                                </ListItem>
                            })
                        }
                    </List>
                </Collapse>
            </List>
        );
    }
}

Legend.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(style)(Legend);
