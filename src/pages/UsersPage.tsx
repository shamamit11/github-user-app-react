import React from 'react';
import { fetchGitHubUsers } from '../services/api';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

import UserCard from '../components/UserCard';
import { URL } from '../utils/constants';
import Loading from '../components/Loading';
import ErrorContainer from '../components/ErrorContainer';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '../interfaces/user';

export const UsersPage: React.FC = () => {
    const navigate = useNavigate();

    const queryClient = useQueryClient()

    const { data, isLoading, error } = useQuery<{ data: User[] }>({
        queryKey: ['users'],
        queryFn: fetchGitHubUsers,
        // staleTime: 5 * 60 * 1000
    });

    const handleDeleteUser = (userId: number) => {
        queryClient.setQueryData(['users'], (prevData: any) => {
            const data = prevData.data as User[];
            const thisData = data.filter(d => d.id !== userId);
            return {
                ...prevData,
                data: thisData
            }
        })
    };

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        const message = "Error loading data !!";
        return (
            <ErrorContainer message={message} />
        )
    }

    return (
        <div className="container mx-auto">
            <header className="flex py-4 mx-3 items-center">
                <FaArrowLeft className='mr-3 cursor-pointer' onClick={() => navigate(URL.HOME)} />
                <h1 className="text-3xl font-bold m-0">GitHub Users</h1>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.data.map((user: any) => (
                    <UserCard key={user.id} user={user} onDelete={() => handleDeleteUser(user.id)} />
                ))}
            </div>
        </div>
    );
};