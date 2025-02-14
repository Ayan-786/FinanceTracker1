export function auth() {
    return {
        headers: {
            Authorization: `Token ${localStorage.token}`,
        },
    };
}

let permissions;

export function checkPermission(permission) {
    if (!permissions) {
        permissions = JSON.parse(localStorage.getItem('permissions'));
    }

    return permissions.includes(permission);
}

export function checkForAdmin() {
    return checkPermission('staff.add_employee');
}

export function clearPermissions() {
    permissions = undefined;
}

export function signin(
    { user, token, permissions: userPermissions },
    navigate
) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('permissions', JSON.stringify(userPermissions));
    navigate('/account');
}

export function signOut(navigate) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
    clearPermissions();
    navigate('/');
}

export function isAuthenticated() {
    return (
        localStorage.getItem('user') &&
        localStorage.getItem('token') &&
        localStorage.getItem('permissions')
    );
}
