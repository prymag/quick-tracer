import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import Form from "./PersonForm";
import { addItem, getCancelSource, IPerson } from "../../api/people";

interface IParams {
    id: string
}

interface IStates {
    formData: IPerson,
    isLoading: boolean,
    isSubmitting: boolean,
}

const defaultFormData: IPerson = {
    firstname: '',
    lastname: '',
    middlename: '',
    email: '',
    birthdate: '',
    gender: 1
}

const checkIsMounted = (mounted: React.MutableRefObject<any>) => {
    mounted.current = true;
    return () => {
        mounted.current = false
    };
}

const createPerson = () => {

    let history = useHistory();

    const states: IStates = {
        formData: defaultFormData,
        isSubmitting: false,
        isLoading: false,
    }

    const mounted = useRef(false);
    const [data, setData] = useState<IStates>(states);
    const { id } = useParams<IParams>();

    useEffect(() => checkIsMounted(mounted), []);

    const onSubmit = async (formData: IPerson) => {
        const source = getCancelSource();
        setData({...data, isSubmitting: true});

        try {
            const res = await addItem(formData, source);
            if (mounted.current) {
                history.push(`/people/${res.data.data.id}`);
            }
        } catch (e) {
            if (mounted.current) {
                setData({...data, isSubmitting: false});
            }
        }
    }

    return (<div>
        {data.isLoading && <strong>Loading...</strong>}
        {!data.isLoading && <Form formData={data.formData} submitCB={onSubmit} isSubmitting={data.isSubmitting}/>}
    </div>)
}

export default createPerson;