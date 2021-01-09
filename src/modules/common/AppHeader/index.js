import { Typography, withStyles } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom';
import * as constants from '../constants';

const styles = (theme) => ({
    header: {
        width: '20%',
        border: `2px dashed ${theme.palette.primary.main}`,
        padding: 5,
        marginBottom: 20,
        textAlign: 'center'
    },
    homeIcon: {
        position: 'absolute',
        left: 20,
        cursor: 'pointer'
    }
});

function AppHeader({ classes }) {
    const history = useHistory();

    const handleHomeBtn = () => {
        history.push(constants.HOME);
    }
    return (
        <header className={classes.header}>
            <HomeIcon
                className={classes.homeIcon}
                color="primary"
                fontSize="large"
                onClick={handleHomeBtn}
            />
            <Typography variant="h5" color="primary">Athena Scan's</Typography>
        </header>
    )
}

export default withStyles(styles)(AppHeader);