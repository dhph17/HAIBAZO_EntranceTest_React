import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";

import './styles.scss'
const PointEasy = ({ value, style, onClick, reset }) => {
    const [backgroundColor, setBackgroundColor] = useState("white");
    const [visible, setVisible] = useState(true);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (reset) {
            setBackgroundColor("white");
            setVisible(true);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }
        // setBackgroundColor("white");
        // setVisible(true);
    }, [reset]);

    const handleClick = () => {
        const { isCorrect } = onClick();
        if (isCorrect) {
            setBackgroundColor("#059862");
            timeoutRef.current = setTimeout(() => {
                setVisible(false);
            }, 2000);
        } else {
            setBackgroundColor("red");
            timeoutRef.current = setTimeout(() => {
                setBackgroundColor("white");
            }, 1000);
        }
    };

    if (!visible) {
        return null;
    }
    return (
        <>
            <div className="point"
                style={{ ...style, backgroundColor }}
                onClick={handleClick}
            >
                {value}
            </div>
        </>
    )
}

PointEasy.propTypes = {
    value: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    reset: PropTypes.bool.isRequired
};

export default PointEasy