import { useState } from 'react';
import { useSelector } from "react-redux";
import { Modal } from '../../context/Modal';
import { Link } from 'react-router-dom';
import Avatar from "../User/Avatar";
import DisplayName from '../User/DisplayName';
import Role from '../User/Role';
import ResourceDate from '../utils/ResourceDate';
import DeleteStoryForm from './DeleteStoryForm';

const SingleStoryHeader = ({ story }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="story-header flex-row">
            <div className="story-info flex-row">
                <Avatar user={story.User} />
                <div className="story-info-text flex-column">
                    <div className="author-info flex-row">
                        <DisplayName user={story.User} />
                        <Role user={story.User} />
                    </div>
                    <ResourceDate resource={story} />
                </div>
            </div>
            {sessionUser && (sessionUser.id === story.userId) ? (
                <div className="story-owner-action flex-row">
                    <Link to={`/stories/${story.id}/edit`}>
                        <button className="edit">Edit</button>
                    </Link>
                    <div className="delete_modal">
                        <button
                            className="delete"
                            onClick={() => setShowDeleteModal(true)}
                        >Delete</button>
                        {showDeleteModal && (
                            <Modal onClose={() => setShowDeleteModal(false)}>
                                <DeleteStoryForm
                                    story={story}
                                    setShowDeleteModal={setShowDeleteModal}
                                />
                            </Modal>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    )
};

export default SingleStoryHeader;
