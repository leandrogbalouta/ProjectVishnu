import { Route, Navigate } from "react-router-dom";
import { ReactNode } from 'react';

function PrivateRoute({path, element} : { path: string; element: ReactNode }) {
  const isLoggedIn = Boolean(localStorage.getItem('token')); // assuming you have stored the auth token in localStorage

  return (
    <Route
      path={path}
      element={isLoggedIn ? (
        {element}
      ) : (
        <Navigate to="/login" replace />
      )}
    />
  );
}
