import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VolunteerTable.css';

interface Volunteer {
    name: string;
    avatar: string;
    hero_project: string;
    notes: string;
    email: string;
    phone: string;
    rating: string;
    status: boolean;
    id: string;
}

//form to add new ppl

const VolunteerTable: React.FC = () => {
    const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
    const [newVolunteer, setNewVolunteer] = useState<Volunteer>({
        name: '',
        avatar: '',
        hero_project: '',
        notes: '',
        email: '',
        phone: '',
        rating: '',
        status: false,
        id: '',
    });
    const [updatingVolunteer, setUpdatingVolunteer] = useState<Volunteer | null>(null);

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
    }, []);

    const handleAddVolunteer = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/bog/users', newVolunteer);
            setVolunteers(prevVolunteers => [...prevVolunteers, response.data]);
            setNewVolunteer({
                name: '',
                avatar: '',
                hero_project: '',
                notes: '',
                email: '',
                phone: '',
                rating: '',
                status: false,
                id: '',
            });
        }   catch (error) {
            console.error('error adding volunteer:', error);
        }
        // console.log('Adding Volunteer...', newVolunteer);
        // setVolunteers(prevVolunteers => [...prevVolunteers, { ...newVolunteer, id: String(Date.now()) }]);
        // setNewVolunteer({
        //     name: '',
        //     avatar: '',
        //     hero_project: '',
        //     notes: '',
        //     email: '',
        //     phone: '',
        //     rating: '',
        //     status: false,
        //     id: '',
        // });
    };

    const handleUpdateVolunteer = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (updatingVolunteer) {
            try {
                const response = await axios.put(`http://localhost:5000/api/bog/users/${updatingVolunteer.id}`, newVolunteer);
                setVolunteers((prevVolunteers) =>
                    prevVolunteers.map((volunteer) =>
                        volunteer.id === updatingVolunteer.id ? response.data : volunteer
                        )
                    );
                    setUpdatingVolunteer(null);
                    setNewVolunteer({
                        name: '',
                        avatar: '',
                        hero_project: '',
                        notes: '',
                        email: '',
                        phone: '',
                        rating: '',
                        status: false,
                        id: '',
                    });
            } catch (error) {
                console.error('error updating volunteer: ', error);
            }
        }
    };
            // setVolunteers((prevVolunteers) =>
            //     prevVolunteers.map((volunteer) =>
            //         volunteer.id === updatingVolunteer.id
            //          ? { 
            //             ...volunteer, 
            //             name: newVolunteer.name || volunteer.name,
            //             avatar: newVolunteer.avatar || volunteer.avatar,
            //             hero_project: newVolunteer.hero_project || volunteer.hero_project,
            //             notes: newVolunteer.notes || volunteer.notes,
            //             email: newVolunteer.email || volunteer.email,
            //             phone: newVolunteer.phone || volunteer.phone,
            //             rating: newVolunteer.rating || volunteer.rating,
            //             status: newVolunteer.status === undefined ? volunteer.status : newVolunteer.status,
            //             id: newVolunteer.id || volunteer.id, 
            //             }
                    
            //         : volunteer
            //     )
    //         setUpdatingVolunteer(null);
    //         setNewVolunteer({
    //             name: '',
    //             avatar: '',
    //             hero_project: '',
    //             notes: '',
    //             email: '',
    //             phone: '',
    //             rating: '',
    //             status: false,
    //             id: '',
    //         });
    //     }
    // };
    const handleDeleteVolunteer = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/bog/users/${id}`);
            setVolunteers(prevVolunteers => prevVolunteers.filter(volunteer => volunteer.id !== id));
        } catch (error) {
            console.error('error deleting volunteer:', error);
        }
    };

    return (
        <div className='table-container'>
            <h2>{updatingVolunteer ? 'Update Volunteer' : 'Add Volunteer'}</h2>
                <form onSubmit={updatingVolunteer ? handleUpdateVolunteer : handleAddVolunteer}>
                    <label htmlFor='name'>Name:</label>
                    <input
                        type='text'
                        id='name'
                        value={newVolunteer.name}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, name: e.target.value})}
                    />
                    <label htmlFor='avatar'>Avatar:</label>
                    <input
                        type='text'
                        id='avatar'
                        value={newVolunteer.avatar}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, avatar: e.target.value})}
                    />
                    <label htmlFor='hero_project'>Hero Project:</label>
                    <input
                        type='text'
                        id='hero_project'
                        value={newVolunteer.hero_project}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, hero_project: e.target.value})}
                    />
                    <label htmlFor='notes'>Notes:</label>
                    <input
                        type='text'
                        id='notes'
                        value={newVolunteer.notes}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, notes: e.target.value})}
                    />
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='text'
                        id='email'
                        value={newVolunteer.email}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, email: e.target.value})}
                    />
                    <label htmlFor='phone'>Phone:</label>
                    <input
                        type='text'
                        id='phone'
                        value={newVolunteer.phone}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, phone: e.target.value})}
                    />
                    <label htmlFor='rating'>Rating:</label>
                    <input
                        type='text'
                        id='rating'
                        value={newVolunteer.rating}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, rating: e.target.value})}
                    />
                    <label htmlFor='status'>Active?</label>
                    <input
                        type='radio'
                        id='status'
                        checked={newVolunteer.status}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, status: e.target.checked})}
                    />
                    <label htmlFor='customId'>ID:</label>
                    <input
                        type='text'
                        id='customId'
                        value={newVolunteer.id}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, id: e.target.value})}
                    />
                    <button type='submit'>
                        {updatingVolunteer ? 'Update Volunteer' : 'Add Volunteer'}
                    </button>
                </form>
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
                            <td>
                                <button onClick={() => setUpdatingVolunteer(volunteer)}>Update</button>
                                <button onClick={() => handleDeleteVolunteer(volunteer.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                
            </div>
        </div>
    );
};

export default VolunteerTable;

