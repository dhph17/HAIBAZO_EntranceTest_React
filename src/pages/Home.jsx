import { useState, useRef, useEffect } from 'react';

import Point from '../layouts/Points/Point';
import './styles.scss';

const Home = () => {
    const [result, setResult] = useState("LET'S PLAY")
    const [resultStyle, setResultStyle] = useState("black");
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
        setResult("LET'S PLAY")
        setResultStyle("black");
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
    // console.log("pos: ", positions);

    const handlePointClick = (value) => {
        if (clickedPoints.includes(value)) {
            setClickedPoints(prev => [...prev, "Da ton tai"]);
            setResult("GAME OVER")
            setResultStyle("red");
            clearInterval(intervalRef.current);
            return { isCorrect: false };
        } else {
            if (clickedPoints.length === 0) {
                if (value !== 1) {
                    setResult("GAME OVER");
                    setResultStyle("red");
                    clearInterval(intervalRef.current);
                    return { isCorrect: false };
                } else {
                    setClickedPoints(prev => [...prev, value]);
                    return { isCorrect: true };
                }
            } else {
                if (value === clickedPoints[clickedPoints.length - 1] + 1) {
                    setClickedPoints(prev => [...prev, value]);
                    if (value === points) {
                        setTimeout(() => {
                            setResult("ALL CLEARED")
                            setResultStyle("green");
                        }, 2000);
                        clearInterval(intervalRef.current);
                    }
                    return { isCorrect: true };
                } else {
                    setResult("GAME OVER")
                    setResultStyle("red");
                    clearInterval(intervalRef.current);
                    return { isCorrect: false };
                }
            }
        }
    };


    console.log("clickedPoints: ", clickedPoints);

    return (
        <>
            <h1
                className='result'
                style={{ color: resultStyle }}
            >{result}</h1>
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
