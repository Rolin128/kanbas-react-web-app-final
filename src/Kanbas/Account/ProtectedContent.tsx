import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface ProtectedContentProps {
    facultyContent: React.ReactNode;
    studentContent: React.ReactNode;
}

export default function ProtectedContent({ facultyContent, studentContent }: ProtectedContentProps) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    if (currentUser && currentUser.role === 'FACULTY') {
        return <>{facultyContent}</>;
    } else if (currentUser && currentUser.role === 'STUDENT') {
        return <>{studentContent}</>;
    } else {
        return <Navigate to="/Kanbas/Account/Signin" />;
    }
}
