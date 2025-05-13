import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = () => {
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '', role: 'user' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/add-user', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('User added!');
    } catch (err) {
      alert('Error adding user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New User</h3>
      <input type="text" placeholder="Name" required minLength={20} maxLength={60}
             onChange={e => setForm({ ...form, name: e.target.value })} />
      <input type="email" placeholder="Email" required
             onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="text" placeholder="Address" maxLength={400}
             onChange={e => setForm({ ...form, address: e.target.value })} />
      <input type="password" placeholder="Password" pattern="(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}"
             title="8-16 chars, one uppercase, one special char"
             onChange={e => setForm({ ...form, password: e.target.value })} />
      <select onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="user">Normal User</option>
        <option value="admin">Admin User</option>
        <option value="store_owner">Store Owner</option>
      </select>
      <button type="submit">Add User</button>
    </form>
  );
};



const AddStoreForm = () => {
    const [form, setForm] = useState({ name: '', email: '', address: '', owner_id: '' });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:5000/api/admin/add-store', form, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        alert('Store added!');
      } catch (err) {
        alert('Error adding store');
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h3>Add New Store</h3>
        <input type="text" placeholder="Store Name" required
               onChange={e => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Store Email"
               onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="text" placeholder="Store Address" maxLength={400}
               onChange={e => setForm({ ...form, address: e.target.value })} />
        <input type="number" placeholder="Owner User ID"
               onChange={e => setForm({ ...form, owner_id: e.target.value })} />
        <button type="submit">Add Store</button>
      </form>
    );
  };
  
  export default AddStoreForm;