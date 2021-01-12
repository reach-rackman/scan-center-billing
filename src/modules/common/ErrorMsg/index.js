import { Typography, withStyles } from "@material-ui/core";

const styles = {
    errorMsg: {
        position: 'absolute',
        bottom: 0,
        fontSize: 12
    }
}

const ErrorMsg = ({ classes, msg, fieldName, className, color="error" }) => {
    return (
        <Typography
            color={color}
            className={className}
            classes={{root: classes.errorMsg}}
        >{fieldName ? (`${fieldName} is required`) : msg}</Typography>
    )
}

export default withStyles(styles)(ErrorMsg);