import React from 'react';
import { Link } from 'react-router-dom';
import { detailInfoType } from './BoardList';



export interface detailInfoProps {
    detailInfo: detailInfoType | undefined;
}

export const ListDetail: React.FC<detailInfoProps> = ({ detailInfo }) => {
    console.log(detailInfo);

    return (
        <div>
            {
                detailInfo ?

                    <div className="detail">
                        < div > <h3>Title</h3><span className="result">{detailInfo.title}</span></div >
                        <div><h3>Description</h3><span className="result">{detailInfo.description}</span></div>
                        <div><h3>Created</h3><span className="result">{detailInfo.created}</span></div>
                        <div className="edit-button">
                            <Link to={{
                                pathname: `/editList/${detailInfo.id}`,
                                state: {
                                    id: detailInfo.id,
                                    title: detailInfo.title,
                                    description: detailInfo.description,
                                    created: detailInfo.created,

                                }
                            }} className="edit-link">Edit</Link>
                        </div>
                    </div >

                    :

                    <div className="before-select">
                        <h4>Please click on a List</h4>
                    </div>

            }
        </div>
    )
}