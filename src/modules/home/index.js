import { Button, Typography } from '@material-ui/core';
import './home.css';

function Home() {
    const handleAddPatient = () => {
        alert('Patient Added!');
    };

    const handleBilling = () => {
        alert('Billing details')
    }
    return (
        <div className="app">
            <header className="app-header">
                <Typography variant="h5" color="primary">Athena Scan's</Typography>
            </header>
            <div className="app-actions">
                <Button variant="contained" color="primary" onClick={handleAddPatient}>
                    <Typography variant="body2" color="secondary">Add Patient</Typography>
                </Button>
                <Button variant="contained" color="primary" onClick={handleBilling}>
                    <Typography variant="body2" color="secondary">Billing</Typography>
                </Button>
            </div>
        </div>
    );
}

export default Home;
