/* eslint-disable react/no-unescaped-entities */
import './index.scss'

const Home = () => {

    return (
        <>
            <h1 className='result'>LET'S PLAY</h1>
            <div className="form">
                <div className='name-input'>
                    <label htmlFor="name">Points:</label>
                    <input type="text" id="name" />
                </div>
                <div className='time-input'>
                    <label htmlFor="time">Times:</label>
                    <p id="time">0.0s</p>
                </div>
                <div className='button-form'>
                    <button className='button'>Play</button>
                </div>
            </div>
            <div className="points-section">

            </div>
        </>
    )
}

export default Home