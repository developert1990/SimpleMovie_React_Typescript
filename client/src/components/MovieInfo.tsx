import { stat } from 'fs';
import React from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom';

interface paramType {
    movieID: string;
}

export interface stateType {
    img: string;
    genres: string;
    title: string;
    desc: string;
    language: string;
}


export const MovieInfo = () => {
    const param = useParams<paramType>();
    const location = useLocation();
    const history = useHistory();


    console.log('location', location);
    console.log('history', history);
    const { movieID } = param;
    console.log('movieID', movieID);
    console.log(location);
    const { state } = location;
    const typedState = state as stateType; // location에서 타입을 unkown으로 지정해준다 이렇게 라이브러리에서 unkown타입으로 지정하는건 as type 이렇게 적용시켜야한다.


    return (
        <div className="movie-detail">
            <img src={typedState.img} alt="" />
            <h3>Title</h3> {typedState.title}
            <h3>Genre</h3> {typedState.genres}
            <h4>Description</h4> {typedState.desc}
            <h4>Language</h4> {typedState.language}
        </div>
    )
}
