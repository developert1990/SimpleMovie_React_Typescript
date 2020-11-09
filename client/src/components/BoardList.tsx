import React, { useState, useEffect, ChangeEvent } from 'react';
import { ListDetail } from './ListDetail';
import { Link } from 'react-router-dom';
import { detailInfoProps } from './ListDetail';

export interface detailInfoType {
    id: number;
    title: string;
    description: string;
    created: string;
}

export const BoardList = () => {
    const [listInfo, setListInfo] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [clickedItem, setClickedItem] = useState<detailInfoType>();
    const URL = "http://localhost:7777/movie";

    useEffect(() => {
        getAllFromDB();
    }, []);

    const getAllFromDB = async () => {
        const PATH = `${URL}/list`
        const response = await fetch(PATH);
        const data = await response.json();
        setListInfo(data);
    }

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        const PATH = `${URL}/search/`;
        // console.log(URL + userInput)
        const response = await fetch(PATH + userInput);
        const data = await response.json();
        setListInfo(data);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newInput = e.target.value;
        setUserInput(newInput);
    }



    const handleListBtn = async (id: number) => {

        const PATH = `${URL}/clickedData/`;
        const response = await fetch(PATH + id);
        const data = await response.json();
        setClickedItem(data);

    }

    useEffect(() => {
        console.log(clickedItem);
    }, [clickedItem]);


    return (
        <div className="board-list">
            <div className="search-from">
                <input type="text" onChange={handleChange} className="search-input" />
            </div>
            <div>
                <button type="submit" className="search-button" onClick={handleClick}>Search</button>
                <Link to="/bulletin" className="add-button">Add</Link>
                <button className="show-allList" onClick={getAllFromDB}>Show All</button>
            </div>

            <div className="titles">
                <div className="title-list">
                    <h3>List</h3>
                    {listInfo.map((list, index) => {
                        const { id, title } = list;
                        return (
                            <div key={index}>
                                <div onClick={(e: React.MouseEvent) => handleListBtn(id)} className="title-button">{title}</div>
                            </div>
                        )
                    })}
                </div>
                <ListDetail detailInfo={clickedItem} />
            </div>


        </div>
    )
}
