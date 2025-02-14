import React from 'react';
import { Navigate, Route } from 'react-router-dom';

export default function ProtectedRoute({ element, ...rest }) {
    if (
        !localStorage.token ||
        !localStorage.user ||
        !localStorage.permissions
    ) {
        return <Navigate to="/" replace />;
    }

    return <Route {...rest} element={element} />;
}
