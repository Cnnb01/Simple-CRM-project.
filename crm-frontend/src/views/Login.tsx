import { useState } from "react";
import api from "../api/axios";

const Login: React.FC = () => {
    const [username, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string|null>(null);

    // React.FormEvent - the specific type for form submissions
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null); // Clear previous errors
        try {
            const resp = await api.post("token", {username, password})
            localStorage.setItem("access_token", resp.data.access)
            localStorage.setItem("refresh_token", resp.data.refresh)
            alert("Success")
        } catch (err) {
            setError("Invalid credentials. Try again!");
            console.error(err);
        }
    }

    return (
        <div className="crm-page-container">
            <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-sm border border-stone-100">
                <h2 className="text-3xl font-serif text-stone-800 mb-8 text-center tracking-tight">CRM Login</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                {error && <p className="text-red-500 text-sm italic text-center">{error}</p>}

                <div>
                    <label className="crm-label">Username</label>
                    <input
                    type="text"
                    className="crm-input"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your username"
                    required
                    />
                </div>

                <div>
                    <label className="crm-label">Password</label>
                    <input
                    type="password"
                    className="crm-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    />
                </div>

                <button type="submit" className="crm-btn-main">Enter Portal</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
