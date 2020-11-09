import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
const RubberBand = require('react-reveal/RubberBand');

interface BoardType {
    title: string;
    desc: string;
}

export const Bulletin = () => {

    const [boardInfo, setBoardInfo] = useState<BoardType>({
        title: '',
        desc: '',
    });
    const [submitState, setSubmitState] = useState<boolean>(false);

    const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('boardInfo: ', boardInfo);
        const URL = "http://localhost:7777/movie";
        if (boardInfo !== undefined) {
            await fetch(`${URL}/board`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(boardInfo),
            });
            setSubmitState(true);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        if (boardInfo) {
            setBoardInfo({
                ...boardInfo,
                [name]: value,
            })
        }
    }

    const handleAddBtn = () => {
        setSubmitState(false);
    }

    return (
        <RubberBand>
            <div className="add-section">
                {submitState ? (
                    <div className="success-msg">
                        <h3>You submitted successfully</h3>
                        <button onClick={handleAddBtn}>ADD</button>
                    </div>
                ) : (
                        <div>

                            <form onSubmit={handleSubmit} className="add-form">
                                <h2>Bulletin</h2>
                                <label>
                                    Title:
                            </label>
                                <input type="text" onChange={handleChange} name="title" />
                                <label>
                                    Description:
                            </label>
                                <input type="text" onChange={handleChange} name="desc" />
                                <input type="submit" className="submit-button" />
                            </form>
                            <Link to="/boardList" className="list">List</Link>
                        </div>
                    )}
            </div>
        </RubberBand>
    )
}
