import React from 'react';
import { useParams } from 'react-router-dom';

const VolunteerDeets: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h2> Volunteer Details</h2>
            <p>Volunteer ID: {id}</p>
        </div>
    );
};

export default VolunteerDeets;