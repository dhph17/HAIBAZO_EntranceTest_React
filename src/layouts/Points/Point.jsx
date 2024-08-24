import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import './styles.scss'
const Point = ({ value, style, onClick }) => {
    const [backgroundColor, setBackgroundColor] = useState("white");

    useEffect(() => {
        setBackgroundColor("white");
    }, [style]);
    const handleClick = () => {
        setBackgroundColor("red");
        onClick();
    };
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

Point.propTypes = {
    value: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Point