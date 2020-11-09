import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';


interface newDataType {
    title: string;
    description: string;
    id: number;
}

interface stateType {
    id: number;
    title: string;
    description: string;
    created: string;
}


export const ListEdit = () => {
    const location = useLocation();
    const URL = "http://localhost:7777/movie";
    const [newData, setNewData] = useState<newDataType>({
        title: '',
        description: '',
        id: 0,
    });
    const [clicked, setClicked] = useState<number>(0);


    const { state } = location;
    const typedState = state as stateType;
    const { id, title, description, created } = typedState;


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewData({
            ...newData,
            [name]: value,
            id: id,
        })
    }

    const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetch(`${URL}/updateData`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData),
        });
        setClicked(1);
    }
    const handleDelete = async (id: number) => {
        await fetch(`${URL}/deleteData/${id}`);
    }

    return (
        <div className="edit-section">
            <h2>Bulletin</h2>
            <form onSubmit={handleUpdate}>
                <label>Title</label>
                <input type="text" defaultValue={title} onChange={handleChange} name="title" />
                <label>Description</label>
                <input type="text" defaultValue={description} onChange={handleChange} name="description" />

                <div className="edit-buttons">
                    <input type="submit" value="Update" className="button updateBtn" />
                    <button onClick={() => handleDelete(id)} className="button deleteBtn">Delete</button>
                    <button className="button listBtn">
                        <Link to="/boardList" className="list-link">List</Link>
                    </button>
                    {clicked > 0 && <Notification duration={2} message="Processing Successed .." />}

                </div>

            </form>
        </div>
    )
}

interface notifyType {
    duration: number;
    message: string;
}

export const Notification: React.FC<notifyType> = ({ duration, message }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {

        //이걸가지고 IIFE (immediately invoked function expression) 한다.
        // 원래 함수를 만들어 변수명정해주고 그걸 콜을 해줘야하는데 이렇게 짜면 이안에있는게 바로그냥실행됨
        (async () => {
            const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms)); //여기서 resolve는 리턴하는게 없다. 그냥 단지 sleep 이라는 함수를 프로미스로 만들어서 비동기로 setTimeout을 실행시키기 위해 만들어 준것이다. 이거 되게 많이 쓰이니까 꼭 알아놓기!!

            await sleep(150);
            setShow(true);
            await sleep(duration * 1000);
            setShow(false);
        })();
        // setTimeout(() => {
        //     setShow(true);
        // }, duration / 2 * 100);
        // setTimeout(() => {
        //     setShow(false);
        // }, duration * 1000);
    }, [duration])

    return (
        <div className={`notification ${show ? 'show' : 'hide'}`}>
            {message}
        </div>
    )
}
