import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useUser} from "../store/UserContext";


const AllowChild = ({ children, permissionMeta }) => {

    const [user] = useUser();
    const [allowed, setAllowed] = useState(false);

    useEffect(()=>{
        let _permission = user.clientPermissions;
        setAllowed(_permission.filter(e=> e.metaName === permissionMeta).length > 0);
    }, [])

    if(allowed)
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    else
        return <></>;
};

AllowChild.propTypes = {
    children: PropTypes.node,
};

export default AllowChild;
