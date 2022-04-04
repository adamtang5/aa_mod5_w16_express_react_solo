import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import UserSolidIcon from '../utils/icons/UserSolidIcon';

const ProfileDropdown = ({ user }) => {
    const dispatch = useDispatch();
    const logout = e => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <div className="profile-dropdown flex-column">
            <div className="profile-dropdown-card flex-row">
                <div className="card-avatar">
                    <UserSolidIcon fill="#155" />
                </div>
                <div className="card-text flex-column">
                    <h3 className="card-name">{user.username}</h3>
                </div>
            </div>
            <div className="profile-dropdown-links flex-column">
                <div>
                    <Link to="/">Write a story</Link>
                </div>
                <div>
                    <Link to="/">Stories</Link>
                </div>
                <div>
                    <Link to="/">Settings</Link>
                </div>
                <div>
                    <button className="auth-button" onClick={logout}>Log Out</button>
                </div>
            </div>
        </div>
    )
};

export default ProfileDropdown;