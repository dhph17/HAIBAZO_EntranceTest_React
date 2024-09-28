import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './styles.scss'
const Main = () => {
    let navigate = useNavigate()
    const [name, setName] = useState("")

    const handleNavigate = (path) => {
        if (!name) {
            alert('Please enter your name');
            return;
        }
        navigate(path);
    };

    return (
        <div className='main'>
            <div className="main-section">
                <h1>Welcome to my game!!!</h1>
                <div className='input-section'>
                    <label htmlFor="name">Your Name: </label>
                    <input
                        type="text"
                        name="name"
                        id=""
                        placeholder='Input your name...'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <h2>Select game mode</h2>
                <ul id='difficult'>
                    <li><button onClick={() => handleNavigate(`/mode1/${name}`)}>1</button></li>
                    <li><button onClick={() => handleNavigate(`/mode2/${name}`)}>2</button></li>
                </ul>
            </div>
        </div>
    )
}

export default Main