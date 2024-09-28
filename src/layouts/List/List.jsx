import PropTypes from "prop-types";

import './styles.scss'
import { useState } from "react";

const List = ({ score }) => {
    const [filter, setFilter] = useState("All")
    const handleSelectChange = (e) => {
        setFilter(e.target.value);
    };
    const filteredScore = (filter === "All") ? score : score?.filter((list) => list.points === parseInt(filter));
    return (
        <div>
            <div className="header">
                <h1>List</h1>
                <div className="header-filter">
                    <label htmlFor="cbb">Points</label>
                    <select name="cbb" id="cbbox" onChange={handleSelectChange} defaultValue={'All'}>
                        <option value="All">All</option>
                        {
                            [...new Set(score?.map((list) => list.points))].map((uniquePoints, index) => (
                                <option value={uniquePoints} key={index}>{uniquePoints}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Point</th>
                        <th>Times</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredScore?.map((list) => (
                            <tr key={list.createdAt}>
                                <td>{list.name}</td>
                                <td>{list.points}</td>
                                <td>{list.times}</td>
                                <td>{list.createdAt}</td>
                            </tr>
                        ))
                    }
                </tbody>


            </table>
        </div>
    )
}

List.propTypes = {
    score: PropTypes.array,
};

export default List