import React from 'react';
import {useSearchParams} from "react-router-dom";
import UserHasAccessTableInfo from "../components/Profile/UserHasAccessTableInfo";

const UserHasAccessTableInfoPage = () => {
    const [searchParams] = useSearchParams();
    const tableName = searchParams.get("tableName");
    const tableOwner = searchParams.get("tableOwner");

    return (
        <div>
            <UserHasAccessTableInfo tableName={tableName} tableOwner={tableOwner}/>
        </div>
    );
};

export default UserHasAccessTableInfoPage;
