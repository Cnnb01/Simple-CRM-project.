import { useReminders } from "../context/ReminderContext";

const ReminderPopup = () => {
    const {alerts, dismissAlert} = useReminders()
    if(alerts.length === 0) return null
    return (
        <div className="fixed top-5 right-5 z-[9999] space-y-4">
            {alerts.map((alert)=>(
                <div key={alert.id} className="bg-white border-l-4 border-amber-500 p-4 shadow-xl rounded-lg animate-slide-in">
                    <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">Reminder — {alert.lead_name}</p>
                    <p className="text-sm font-medium text-stone-700">{alert.message}</p>
                    <button onClick={() => dismissAlert(alert.id)}>Dismiss</button>
                </div>
            ))}
        </div>
    )
}
export default ReminderPopup;