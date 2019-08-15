import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { green, yellow, red } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
 
const useStyles = makeStyles({
    redAvatar: {
        margin: 10,
        color: red[500]
        },
    greenAvatar: {
        margin: 10,
        color: green[500]
    },
    yellowAvatar: {
        margin: 10,
        color: yellow[500]
        }
});
 
export default function IconAvatars() {
const classes = useStyles();
 
    return (
        <div>
        <Icon className={classes.redAvatar} onClick="">place</Icon>
        <Icon className={classes.greenAvatar}>place</Icon>
        <Icon className={classes.yellowAvatar}>place</Icon>
        </div>
        );
}