import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VolunteerTable.css';

interface Volunteer {
    id: string;
    name: string;
    avatar: string;
    hero_project: string;
    notes: string;
    email: string;
    phone: string;
    rating: string;
    status: boolean;
}

const VolunteerTable: React.FC = () => {
    const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Volunteer[]>('http://localhost:5000/api/bog/users');
                setVolunteers(response.data);
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };
        fetchData();
    })

    return (
        <div className='table-container'>
            <table className='volunteer-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Avatar</th>
                        <th>Hero Project</th>
                        <th>Notes</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Rating</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {volunteers.map((volunteer) => (
                        <tr key= {volunteer.id}>
                            <td>{volunteer.name}</td>
                            <td>
                                <img src={volunteer.avatar} alt={volunteer.name} />
                            </td>
                            <td>{volunteer.hero_project}</td>
                            <td>{volunteer.notes}</td>
                            <td>{volunteer.email}</td>
                            <td>{volunteer.phone}</td>
                            <td>{volunteer.rating}</td>
                            <td>{volunteer.status ? 'Active' : 'Inactive'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VolunteerTable;

