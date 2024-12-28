import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const { token, setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
        token && setToken('');
        token && localStorage.removeItem('token');
    }

    return (
        token && (
            <header className="border-b border-gray-200 bg-gray-50">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl"></h1>

                        </div>

                        <div className="flex items-center gap-4">


                            <button onClick={logout}
                                className="inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                                type="button"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        )


    )
}

export default Header