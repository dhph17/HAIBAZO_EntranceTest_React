import { useState, useRef, useEffect } from 'react';

import Point from '../layouts/Points/Point';
import './styles.scss';

const Home = () => {
    const [times, setTimes] = useState(0);
    const [btn, setBtn] = useState("Play");
    const [isClickedBtn, setIsClickedBtn] = useState(0);
    const [points, setPoints] = useState(0);
    const [inputPoints, setInputPoints] = useState(0);
    const intervalRef = useRef(null);
    const [positions, setPositions] = useState([]);
    const [clickedPoints, setClickedPoints] = useState([]);

    const handleClickBtn = () => {
        clearInterval(intervalRef.current);

        if (btn === "Restart") {
            setTimes(0);
            setPoints(inputPoints);
        } else {
            setPoints(inputPoints);
            setBtn("Restart");
        }
        setIsClickedBtn(isClicked => isClicked + 1);
        intervalRef.current = setInterval(() => {
            setTimes(times => times + 0.1);
        }, 100);
    }

    useEffect(() => {
        const generateRandomPosition = () => {
            return Array.from({ length: points }).map(() => {
                const top = Math.floor(Math.random() * 90); // Random value between 0 and 90%
                const left = Math.floor(Math.random() * 90); // Random value between 0 and 90%
                return { top: `${top}%`, left: `${left}%` };
            });
        }

        if (points > 0) {
            setPositions(generateRandomPosition());
        }
        setClickedPoints([]);

    }, [isClickedBtn]);
    console.log("pos: ", positions);

    const handlePointClick = (value) => {
        setClickedPoints(prev => [...prev, value]); // Thêm số của Point đã click vào mảng
    };

    return (
        <>
            <h1 className='result'>LET&apos;S PLAY</h1>
            <form className="form">
                <div className='name-input'>
                    <label htmlFor="name">Points:</label>
                    <input type="text" id="name"
                        onChange={(e) => setInputPoints(parseInt(e.target.value) || 0)}
                    />
                </div>
                <div className='time-input'>
                    <label htmlFor="time">Times:</label>
                    <p id="time">{times.toFixed(1)}s</p>
                </div>
                <div className='button-form'>
                    <input
                        type='button'
                        className='button'
                        onClick={handleClickBtn}
                        value={btn}
                    />
                </div>
            </form>

            <div className="points-section">
                {Array.from({ length: points }).map((_, index) => (
                    <Point
                        key={index}
                        value={index + 1}
                        style={positions[index] || {}}
                        onClick={() => handlePointClick(index + 1)} // Gọi callback khi click
                    />
                ))}
            </div>

            <div>
                <h2>Clicked Points:</h2>
                <ul>
                    {clickedPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Home;
