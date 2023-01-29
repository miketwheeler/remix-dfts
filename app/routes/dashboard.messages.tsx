const handleBackButton = () => {
    window.history.back();
}

export default function DashboardMessagesRoute() {
    return (
        <div>
            <h3 style={{color: 'purple'}}>Dashboard - Messages Tab</h3>
            <br />
            <br />
            <button type='button' onClick={handleBackButton}>Go Back</button>
        </div>
    );
}