
const handleBackButton = () => {
    window.history.back();
}

export default function DashboardTasksRoute() {
    return (
        <div>
            <h3 style={{color: 'purple'}}>Dashboard - Tasks Tab</h3>
            <br />
            <br />
            <button type='button' onClick={handleBackButton}>Go Back</button>
        </div>
    );
}