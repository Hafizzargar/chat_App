import React, { useEffect, useState } from 'react';
import './people.css';
import axios from 'axios';
import Dispdatauser from '../displaydatauserchat/dispdatauser';

function People({nme, setnme}) {
  const [users, setUsers] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [id, setId] = useState('');

  // Get user info
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/home/userinfo', { withCredentials: true });
        setUsers(res.data.datagetuser || []);
        setCurrentUserEmail(res.data.email || '');
        setnme(res.data.name);
      } catch (err) {
        console.log(err, 'not getting user information');
      }
    };
    getUserInfo();
  }, []);

  // Handle user selection
  const getUser = (_id) => {
    setId(_id);
  };

  // Filter users based on search term (searching by username)
  const filteredUsers = users.filter(user =>
    user.email !== currentUserEmail &&
    user.username.toLowerCase().includes(searchTerm)
  );

  return (
    <div className='chatpeople'>
      <div className='helpcenter'>🆘</div>

      <div className='peoples'>
        <input
          className='search'
          placeholder='SEARCH NAME HERE'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />

        <div className='people'>
          {filteredUsers.map(user => (
            <div key={user._id} className='peo' onClick={() => getUser(user._id)}>
              {user.username}
            </div>
          ))}
        </div>
      </div>

      <div className='chat'>
        {id && <Dispdatauser _id={id} />}
      </div>
    </div>
  );
}

export default People;
