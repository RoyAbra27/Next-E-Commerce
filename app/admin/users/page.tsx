"use client";
import React, { useEffect, useState } from 'react'
import Table from './components/table';
import { UserInterface } from '@/app/api/admin/users/route';

const Users = () => {
    const [users, setusers] = useState<UserInterface[]>([])
    const getUsersList = async() => {
        try{
            const res = await fetch('/api/admin/users');
            const data = await res.json();
            if(!data.errorMessage)
            setusers(data);

            console.log(data);
        }catch(err){
            console.log(err);
        }

    }
    useEffect(() => {
        getUsersList();
    }, [])
    console.log(users);
  return (
    <div>
        <Table users={users} getUsersList={getUsersList} />
    </div>
  )
}

export default Users