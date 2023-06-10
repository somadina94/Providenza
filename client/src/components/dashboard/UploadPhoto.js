import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { BsFillPersonFill } from 'react-icons/bs';
import { useCookies } from 'react-cookie';

import classes from './UploadPhoto.module.css';
import { alertActions } from '../../store/alert-slice';
import { uploadPhoto } from '../../api/api';
import Spinner from '../UI/Spinner';

const UploadPhoto = () => {
    const [showSpinner, setShowSpinner] = useState(false);
    const dispatch = useDispatch();
    const { jwt } = useCookies(['jwt'])[0];
    const photoRef = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();
        setShowSpinner(true);
        const form = new FormData();
        const photo = photoRef.current.files[0];
        form.append('photo', photo);

        const res = await uploadPhoto(jwt, form);

        if (res.status === 'success') {
            dispatch(alertActions.setState({ message: 'Photo uploaded successfully', status: res.status }));
        } else {
            dispatch(alertActions.setState({ message: res.message, status: 'error' }));
        }

        setShowSpinner(false);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            {showSpinner && <Spinner />}
            <div className={classes.group}>
                <label>Upload photo</label>
                <div className={classes['input-group']}>
                    <BsFillPersonFill className={classes.icon} />
                    <input type="file" ref={photoRef} />
                </div>
            </div>
            <div className={classes.action}>
                <button type="submit">Change photo</button>
            </div>
        </form>
    );
};

export default UploadPhoto;
