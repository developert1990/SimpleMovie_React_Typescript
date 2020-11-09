import { Movie2, MovieList, Search, Menu, MovieInfo, LogIn, SignUp, Bulletin, BoardList, ListEdit } from '.';
import React from 'react';
import { Main } from './Main';
import { BrowserRouter, Route } from 'react-router-dom';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return (
        <BrowserRouter>
            <Menu />
            <Route exact path="/" component={Main} />
            <Route path="/search" component={Search} />
            <Route path="/movie2" component={Movie2} />
            <Route path="/movieList" component={MovieList} />
            <Route path={"/movieInfo/:movieID"} component={MovieInfo} />
            <Route path={"/login/bulletin"} component={LogIn} />
            <Route path={"/signup"} component={SignUp} />
            <Route path={"/bulletin"} component={Bulletin} />
            <Route path={"/boardList"} component={BoardList} />
            <Route path={"/editList/:listID"} component={ListEdit} />
        </BrowserRouter>
    )
}