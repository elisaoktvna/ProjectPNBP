import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { useFetch } from '../../hooks/useFetch';  

const Profil = () => {
  const { data: user } = useFetch("/auth/user");  
  const [isEditing, setIsEditing] = useState(false); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    previousPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    console.log('Form data yang disimpan:', formData);
    setIsEditing(false);  
  };

  const handleChangePasswordClick = () => {
    setIsChangingPassword(!isChangingPassword);
  };

  const handleSavePasswordClick = () => {
    console.log('Password data yang disimpan:', passwordData);
    setIsChangingPassword(false);  
  };

  if (!user) {
    return <div>Loading...</div>; 
  }

  return (
    <Layout>
      <div className="bg-white p-8 rounded-lg shadow-md flex">
        <div className="w-1/3 flex justify-center items-center">
          <img src="https://placehold.co/200x200" alt="Profile picture" className="rounded-lg w-48 h-48 object-cover" />
        </div>
        <div className="w-2/3 pl-8">
          <h1 className="text-2xl font-semibold mb-6">Profil</h1>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            {isEditing ? (
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className="bg-gray-200 p-2 rounded-lg w-full" 
              />
            ) : (
              <div className="bg-gray-200 p-2 rounded-lg">{user.name}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            {isEditing ? (
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="bg-gray-200 p-2 rounded-lg w-full" 
              />
            ) : (
              <div className="bg-gray-200 p-2 rounded-lg">{user.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Role</label>
            <div className="bg-gray-200 p-2 rounded-lg">{user.role}</div> 
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Pin</label>
            <div className="bg-gray-200 p-2 rounded-lg">{user.pin || 'XXXXXXXX'}</div> 
          </div>

          <div className="flex space-x-4 mt-6">
            {!isEditing && (
              <button 
                onClick={handleEditClick} 
                className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-100"
              >
                Edit info
              </button>
            )}

            {isEditing && (
              <button 
                onClick={handleSaveClick} 
                className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-100"
              >
                Save user
              </button>
            )}

            <button 
              onClick={handleChangePasswordClick} 
              className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-100"
            >
              Change Password
            </button>
          </div>

          {isChangingPassword && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4">Change Password</h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Previous Password</label>
                <input 
                  type="password" 
                  name="previousPassword" 
                  value={passwordData.previousPassword} 
                  onChange={handlePasswordChange} 
                  className="bg-gray-200 p-2 rounded-lg w-full" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">New Password</label>
                <input 
                  type="password" 
                  name="newPassword" 
                  value={passwordData.newPassword} 
                  onChange={handlePasswordChange} 
                  className="bg-gray-200 p-2 rounded-lg w-full" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Confirm New Password</label>
                <input 
                  type="password" 
                  name="confirmNewPassword" 
                  value={passwordData.confirmNewPassword} 
                  onChange={handlePasswordChange} 
                  className="bg-gray-200 p-2 rounded-lg w-full" 
                />
              </div>
              <button 
                onClick={handleSavePasswordClick} 
                className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-100"
              >
                Save Password
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profil;
