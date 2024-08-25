import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import './styles.scss'
const Point = ({ value, style, onClick }) => {
    const [backgroundColor, setBackgroundColor] = useState("white");
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setBackgroundColor("white");
        setVisible(true);
    }, [style]);

    const handleClick = () => {
        const { isCorrect } = onClick();
        if (isCorrect) {
            setBackgroundColor("red");
            setTimeout(() => {
                setVisible(false);
            }, 2000);
        } else {
            setBackgroundColor("red");
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

Point.propTypes = {
    value: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Point