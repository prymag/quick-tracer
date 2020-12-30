import React, { useCallback, useEffect, useState } from 'react';
import { getAll, IPeople } from "../api/people";

interface IStates {
    people: Array<IPeople>,
    loading: Boolean
}

const loadTable = (data: IStates, setData: React.Dispatch<any>) => {
    (async () => {
        setData({...data, loading: true});
        const res = await getAll();
        console.log(data, res.data.data);
        setData({people: res.data.data, loading: false});

        
    })()
}

const getGender = (id: number) => {

    if (parseInt(id) === 1) {
        return 'Male';
    }
    if (parseInt(id) === 2) {
        return 'Female';
    }

    return 'Unknown';
}

const PeopleTable = () => {

    const [data, setData] = useState<IStates>({
        people: [],
        loading: false
    })

    useEffect(() => loadTable(data, setData), []);

    const tblRows = data.people.map(person => {
        return (<tr key={person.id}>
            <td>{person.firstname} {person.middlename} {person.lastname}</td>
            <td>{person.email}</td>
            <td>{getGender(person.gender)}</td>
            <td>{person.birthdate}</td>
        </tr>)
    })

    return (<div>
        {data.loading && 'loading'}
        People Table
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
                {tblRows}
            </tbody>
        </table>
    </div>)
}

export default PeopleTable;