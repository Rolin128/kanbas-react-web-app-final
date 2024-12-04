import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "./Table";
import * as userClient from "../../Account/client";
import * as courseClient from "../client";

export default function People() {
    const [users, setUsers] = useState<any[]>([]);
    const { uid,cid } = useParams();
    const fetchUsers = async () => {
        const users = await courseClient.findUsersForCourse(cid as string);
        setUsers(users);
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <PeopleTable users={users} />
        </div>
    );
}