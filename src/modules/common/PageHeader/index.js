import { Typography, withStyles } from "@material-ui/core";

const styles = (theme) => ({
    header: {
        width: '100%',
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        paddingBottom: 10,
        textAlign: 'left'
    }
});

function PageHeader({ classes, pageName }) {
    return (
        <header className={classes.header}>
            <Typography variant="h6" color="primary">{pageName}</Typography>
        </header>
    )
}

export default withStyles(styles)(PageHeader);