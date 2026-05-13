import {useNavigate} from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) =>{
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        navigate("/login")
    }

    return(
        <div className=" bg-[#fcfaf7] p-4">
                <div className="flex justify-end mb-4">
                    <button 
                        onClick={handleLogout}
                        className="group flex items-center gap-2 text-stone-400 hover:text-stone-800 transition-all text-[11px] uppercase tracking-[0.2em] font-bold"
                    >
                        <span>Sign Out</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                    </button>
                </div>
            </div>
    );

}
export default NavBar;