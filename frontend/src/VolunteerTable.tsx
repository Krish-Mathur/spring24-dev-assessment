import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VolunteerTable.css';
import { useAuth0 } from '@auth0/auth0-react';


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

    const { isAuthenticated, } = useAuth0();

    //adding sort+filter for hero_project
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
    const [filterValue, setFilterValue] = useState<string>('');

    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(e.target.value);
    };

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
    const [currentPage, setCurrentPage] = useState<number>(0);
    const itemsPerPage = 10;
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

        setCurrentPage(Math.ceil((volunteers.length + 1) / itemsPerPage) - 1);
    };
    const indexOfLastVolunteer = (currentPage + 1) * itemsPerPage;
    const indexOfFirstVolunteer = indexOfLastVolunteer - itemsPerPage;
    const paginatedVolunteers = volunteers.slice(indexOfFirstVolunteer, indexOfLastVolunteer);
   
    const filteredAndSortedVolunteers = paginatedVolunteers
        .filter((volunteer) => volunteer.hero_project.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()))
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.hero_project.localeCompare(b.hero_project);
            } else if (sortOrder === 'desc') {
                return b.hero_project.localeCompare(a.hero_project);
            }
            return 0
        });



    const handleUpdateVolunteer = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (updatingVolunteer) {
            try {
                const payload = {
                    name: newVolunteer.name || updatingVolunteer.name,
                    avatar: newVolunteer.avatar || updatingVolunteer.avatar,
                    hero_project: newVolunteer.hero_project || updatingVolunteer.hero_project,
                    notes: newVolunteer.notes || updatingVolunteer.notes,
                    email: newVolunteer.email || updatingVolunteer.email,
                    phone: newVolunteer.phone || updatingVolunteer.phone,
                    rating: newVolunteer.rating || updatingVolunteer.rating,
                    status: newVolunteer.status === undefined ? updatingVolunteer.status : newVolunteer.status,
                    id: newVolunteer.id || updatingVolunteer.id,
                };
    
                const response = await axios.put(`http://localhost:5000/api/bog/users/${updatingVolunteer.id}`, payload)
                console.log('update response: ', response.data)
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
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, name: e.target.value || newVolunteer.name })}
                    />
                    <label htmlFor='avatar'>Avatar:</label>
                    <input
                        type='text'
                        id='avatar'
                        value={newVolunteer.avatar}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, avatar: e.target.value || newVolunteer.avatar })}
                    />
                    <label htmlFor='hero_project'>Hero Project:</label>
                    <input
                        type='text'
                        id='hero_project'
                        value={newVolunteer.hero_project}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, hero_project: e.target.value || newVolunteer.hero_project })}
                    />
                    <label htmlFor='notes'>Notes:</label>
                    <input
                        type='text'
                        id='notes'
                        value={newVolunteer.notes}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, notes: e.target.value || newVolunteer.notes })}
                    />
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='text'
                        id='email'
                        value={newVolunteer.email}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, email: e.target.value || newVolunteer.email })}
                    />
                    <label htmlFor='phone'>Phone:</label>
                    <input
                        type='text'
                        id='phone'
                        value={newVolunteer.phone}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, phone: e.target.value || newVolunteer.phone })}
                    />
                    <label htmlFor='rating'>Rating:</label>
                    <input
                        type='text'
                        id='rating'
                        value={newVolunteer.rating}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, rating: e.target.value || newVolunteer.rating })}
                    />
                    <label htmlFor='status'>Active?</label>
                    <input
                        type='radio'
                        id='status'
                        checked={newVolunteer.status}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, status: e.target.checked || newVolunteer.status })}
                    />
                    <label htmlFor='customId'>ID:</label>
                    <input
                        type='text'
                        id='customId'
                        value={newVolunteer.id}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, id: e.target.value || newVolunteer.id })}
                    />
                    <button type='submit'
                     disabled={!isAuthenticated} 
                     
                    >
                        {updatingVolunteer ? 'Update Volunteer' : 'Add Volunteer'}
                    </button>
                </form>
                <label htmlFor='heroProjectFilter'>Filter by Hero Project:</label>
                    <input
                        type='text'
                        id='heroProjectFilter'
                        value={filterValue}
                        onChange={handleFilterChange}
                    />
            <table className='volunteer-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Avatar</th>
                        <th onClick={handleSort}>Hero Project (click me){sortOrder && `(${sortOrder === 'asc' ? '↑' : '↓' })`}</th>
                        <th>Notes</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Rating</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAndSortedVolunteers.map((volunteer) => (
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
                                <button  disabled={!isAuthenticated} onClick={() => setUpdatingVolunteer(volunteer)}>Update</button>
                                <button  disabled={!isAuthenticated} onClick={() => handleDeleteVolunteer(volunteer.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ padding: 30, display: 'flex', justifyContent: 'space-between' }}>
                <span>
                    Total Pages: {Math.ceil(volunteers.length / itemsPerPage)}
                </span>
                <span>
                    Page : {' '}
                    {[...Array(Math.ceil(volunteers.length / itemsPerPage))].map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            style={{
                                fontWeight: currentPage === index ? 'bold' : 'normal',
                            }}
                            onClick={() => setCurrentPage(index)}
                            >
                                {index + 1}
                            </button>
                    ))}
                </span>
            </div>
        </div>
    );
};

export default VolunteerTable;

