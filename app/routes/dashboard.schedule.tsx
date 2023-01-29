const handleBackButton = () => {
    window.history.back();
}

export default function DashboardScheduleRoute() {
    return (
        <div>
            <h3 style={{color: 'purple'}}>Dashboard - Schedule Tab</h3>
            <br />
            <br />
            <button type='button' onClick={handleBackButton}>Go Back</button>
        </div>
    );
}