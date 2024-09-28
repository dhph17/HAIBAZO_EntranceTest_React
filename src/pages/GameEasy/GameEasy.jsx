import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './styles.scss';
import PointEasy from '../../layouts/Points/PointEasy';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import {
    faHeart as faHeartRegular,

} from '@fortawesome/free-regular-svg-icons';
import List from '../../layouts/List/List';

const GameEasy = () => {
    let { name } = useParams();
    const [result, setResult] = useState("LET'S PLAY");
    const [resultStyle, setResultStyle] = useState("black");
    const [times, setTimes] = useState(0);
    const [btn, setBtn] = useState("Play");
    const [isClickedBtn, setIsClickedBtn] = useState(0);
    const [points, setPoints] = useState(0);
    const [inputPoints, setInputPoints] = useState(0);
    const intervalRef = useRef(null);
    const [positions, setPositions] = useState([]);
    const [clickedPoints, setClickedPoints] = useState([0]);
    const [reset, setReset] = useState(false);
    const [life, setLife] = useState(2)
    const [scores, setScore] = useState([])

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
        setReset(true)
        intervalRef.current = setInterval(() => {
            setTimes(times => times + 0.1);
        }, 100);
    }

    useEffect(() => {
        setScore(JSON.parse(localStorage.getItem(1)));
    }, [])

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
        setClickedPoints([0]);
        setLife(2)
        setReset(false);
    }, [isClickedBtn]);
    // console.log("pos: ", positions);

    const saveToList = (list) => {
        let lists = JSON.parse(localStorage.getItem(1))
        console.log(lists);

        if (!lists) {
            lists = [];
        }
        lists.push(list)
        console.log(lists);
        localStorage.setItem(1, JSON.stringify(lists))
        setScore(JSON.parse(localStorage.getItem(1)));
    }

    const handlePointClick = (value) => {
        // console.log("Last clicked point:", clickedPoints[clickedPoints.length - 1]);
        if (clickedPoints.includes(value)) {
            setClickedPoints(prev => [...prev, "Da ton tai"]);
            setResult("GAME OVER")
            setResultStyle("red");
            clearInterval(intervalRef.current);
            return { isCorrect: false };
        } else {
            if (value === clickedPoints[clickedPoints.length - 1] + 1) {
                setClickedPoints(prev => [...prev, value]);
                if (value === points) {
                    setTimeout(() => {
                        setResult("ALL CLEARED")
                        setResultStyle("green");
                        clearInterval(intervalRef.current);
                        saveToList({
                            name: name,
                            times: (times + 2).toFixed(1),
                            points: points,
                            createdAt: new Date().toLocaleTimeString("en-GB") + " " + new Date().toLocaleDateString("en-GB")
                        })

                    }, 2000);

                }
                return { isCorrect: true };
            } else {
                if (life > 0) {
                    setTimes(times => times + 2);
                    setLife(life => life - 1);
                } else {
                    setLife(-1)
                    setResult("GAME OVER")
                    setResultStyle("red");
                    clearInterval(intervalRef.current);
                }

                return { isCorrect: false };
            }
        }
    };


    // console.log("clickedPoints: ", clickedPoints);

    return (
        <>
            <section>
                <div id="game-section">
                    <h1 className='result'>Hello {name}.&nbsp;
                        <span

                            style={{ color: resultStyle }}
                        >
                            {result}
                        </span>
                    </h1>

                    <form className="form">
                        <div className='name-input'>
                            <label htmlFor="name">Points:</label>
                            <input type="number" id="name"
                                onChange={(e) => setInputPoints(parseInt(e.target.value) || 0)}
                            />
                        </div>
                        <div className='time-input'>
                            <label htmlFor="time">Times:</label>
                            <p id="time">{times.toFixed(1)}s</p>
                        </div>
                        <div className='button-form'>
                            <div id="input">
                                <input
                                    type='button'
                                    className='button'
                                    onClick={handleClickBtn}
                                    value={btn}
                                />
                            </div>

                            <div id="life">
                                <p>Life: </p>
                                <div>
                                    {Array.from({ length: life + 1 }).map((_, index) => (
                                        <FontAwesomeIcon icon={faHeartSolid} className='faHeart' key={index} />
                                    ))}
                                    {Array.from({ length: 3 - (life + 1) }).map((_, index) => (
                                        <FontAwesomeIcon icon={faHeartRegular} className='faHeart' key={index} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="points-section">
                        {Array.from({ length: points }).map((_, index) => (
                            <PointEasy
                                key={index}
                                value={index + 1}
                                style={positions[index] || {}}
                                onClick={() => handlePointClick(index + 1)}
                                reset={reset}
                            />
                        ))}
                    </div>
                </div>
                <div id="list-section">
                    <div id="rule-section">
                        <h1>Rule</h1>
                        <p>You will have 3 lives for this game, if you click on the wrong point there will be a 2s penalty</p>
                    </div>
                    <List score={scores} />
                </div>
            </section>

        </>
    )
}

export default GameEasy;
