import React, { useEffect, useRef, useState } from "react";
import Form from "./PersonForm";
import { getItem, getCancelSource, updateItem, IPerson } from "../../api/people";
import { useParams } from "react-router";

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

const loadData = (id: number, data: IStates, setData: React.Dispatch<React.SetStateAction<IStates>>) => {
    const source = getCancelSource();

    (async () =>{
        try {
            setData({...data, isLoading: true});
            const res = await getItem(id, source);
            setData({...data, formData: res.data.data, isLoading: false});
        } catch (e) {

        }
    })()

    return () => {
        source.cancel();
    }
}

const checkIsMounted = (mounted: React.MutableRefObject<any>) => {
    mounted.current = true;
    return () => {
        mounted.current = false
    };
}

const showPerson = () => {

    const states: IStates = {
        formData: defaultFormData,
        isSubmitting: false,
        isLoading: false,
    }

    const mounted = useRef(false);
    const [data, setData] = useState<IStates>(states);
    const { id } = useParams<IParams>();

    useEffect(() => checkIsMounted(mounted), []);
    useEffect(() => loadData(parseInt(id), data, setData), []);

    const onSubmit = async (formData: IPerson) => {
        const source = getCancelSource();
        setData({...data, isSubmitting: true});

        try {
            await updateItem(parseInt(id), formData, source);
            if (mounted.current) {
                setData({...data, isSubmitting: false});
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

export default showPerson;