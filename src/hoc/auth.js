import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {authUser} from '../actions/userActions';

export default (SpecificComponent, option, adminRoute = null) => {
    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(authUser()).then(response => {
                if(!response.payload.is_authorized) {
                    if(option) {
                        props.history.push('/login');
                    }
                } else {
                    if(adminRoute && !response.payload.is_authorized) {
                        props.history.push('/');
                    } else {
                        if (option === false) {
                            props.history.push('/');
                        }
                    }
                }
            })
        }, []);
        return(
            <SpecificComponent {...props} user={user} />
        );
    }
    return AuthenticationCheck;
}