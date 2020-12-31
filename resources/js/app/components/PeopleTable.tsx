import React, { useCallback, useEffect, useState } from "react";
import { getCancelSource, getAll, deleteItem, cancel, IPerson } from "../api/people";
import "./styles.scss";

interface IStates {
    people: Array<IPerson>,
    loading: Boolean
}

interface ITableRowProps {
    person: IPerson,
    deleteCb: Function
}

const loadTable = (data: IStates, setData: React.Dispatch<any>) => {
    const source = getCancelSource();

    (async () => {
        setData({...data, loading: true});

        try {
            const res = await getAll(source);
            setData({people: res.data.data, loading: false});
        } catch (e) {
            console.log(e);
            //setData({...data, loading: false});
        }
    })()

    return () => {
        console.log('cancelled');

        cancel(source);
    };
}

const deleteData = async (id: number, data: IStates, setData: React.Dispatch<any>) => {
    const res = await deleteItem(id);
    const index = data.people.findIndex(person => person.id === id);
    data.people.splice(index, 1);
    setData({...data, people: data.people});

    return () => {};
}

const getGender = (id: number) => {
    if (id === 1) {
        return 'Male';
    }
    if (id === 2) {
        return 'Female';
    }

    return 'Unknown';
}

const TableRow = (props: ITableRowProps) => {

    const [data, setData] = useState({
        promptDelete: false,
        isDeleting: false
    })
    const name = `${props.person.firstname} ${props.person.middlename} ${props.person.lastname}`;

    const handleClick = (ev: React.MouseEvent<HTMLElement>) => {
        ev.preventDefault();
        setData({...data, isDeleting: true});
        props.deleteCb(props.person.id);
    }

    return (<tr >
        <td>{name}</td>
        <td>{props.person.email}</td>
        <td>{getGender(props.person.gender)}</td>
        <td>{props.person.birthdate}</td>
        <td>
            {!data.isDeleting && <a href="#" onClick={handleClick}>Delete</a>}
            {data.isDeleting && <strong>Deleting...</strong>}
        </td>
    </tr>)
}

const PeopleTable = () => {

    const [data, setData] = useState<IStates>({
        people: [],
        loading: false
    })

    useEffect(() => loadTable(data, setData), []);
    

    const onDelete = (id: number) => deleteData(id, data, setData);

    return (<div>
        {data.loading && <h3>Loading...</h3>}
        
        {!!data.people.length && 
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Birthdate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.people.map(person => {
                        return <TableRow person={person} key={person.id} deleteCb={onDelete}/>
                    })}
                </tbody>
            </table>
        }
    </div>)
}

export default PeopleTable;