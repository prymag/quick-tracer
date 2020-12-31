import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useRouteMatch } from "react-router-dom";

interface IPersonForm {
    firstname: string,
    lastname: string,
    middlename: string,
    birthdate: string,
    gender: number,
    email: string
}

interface IFormProps {
    formData?: IPersonForm
    submitCB?: Function,
    isSubmitting?: boolean
}

const submitForm = (data: IPersonForm, props: IFormProps) => {
    if (props.submitCB) {
        props.submitCB(data);
    }
}

const form = (props: IFormProps) => {

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data: IPersonForm) => submitForm(data, props);
    const match = useRouteMatch();

    return (<form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
            <label htmlFor="firstname">Firstname</label>
            <input type="text" 
                defaultValue={props.formData?.firstname} 
                name="firstname" 
                id="firstname" 
                ref={register({required: true})} />
        </div>
        <div className="form-group">
            <label htmlFor="middlename">Middlename</label>
            <input type="text" 
                defaultValue={props.formData?.middlename} 
                name="middlename" 
                id="middlename" 
                ref={register({required: true})} />
        </div>
        <div className="form-group">
            <label htmlFor="lastname">Lastname</label>
            <input type="text" 
                defaultValue={props.formData?.lastname} 
                name="lastname" 
                id="lastname" 
                ref={register({required: true})} />
        </div>
        <div className="form-group">
            <label htmlFor="birthdate">Birthdate</label>
            <input type="text" 
                defaultValue={props.formData?.birthdate} 
                name="birthdate" 
                id="birthdate" 
                ref={register({required: true})} />
        </div>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" 
                defaultValue={props.formData?.email} 
                name="email" 
                id="email" 
                ref={register({
                    required: true,
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Entered value does not match email format"
                      }
                })} />
        </div>
        <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select 
                id="gender" 
                name="gender"
                defaultValue={props.formData?.gender}
                ref={register({required: true})}>
                <option value="1">Male</option>
                <option value="2">Female</option>
            </select>
        </div>
        
        <Link to="/people">Cancel</Link>
        <button disabled={props.isSubmitting}>Submit</button>
    </form>)
}

export default form;