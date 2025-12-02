import { useEffect, useState } from 'react';
import { fetchUsers } from './components/service/api';
import Card from '@components/Card/Card';
import Input from './components/Input/Input';
import Select from './components/Select/Select';

function App() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [select, setSelect] = useState('az');

  const [isLoading, setIsLoading] = useState(false)
  console.log(isLoading)
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const result = await fetchUsers();
        setIsLoading(true)
        setUsers(result);
      } catch (error) {
       
        console.log(error);
      }
    };
    fetchUsersData();
  }, []);

  const compareUsers = (currentUser, nextUser) => {
    switch (select) {
      case 'az':
        return currentUser.name.first.localeCompare(nextUser.name.first);
      case 'age':
        return currentUser.dob.age - nextUser.dob.age;
      default:
        return 0;
    }
  };

  const isNameSearch = searchUser.toLowerCase().trim();
  const sortByUser = user => {
    const searchByName = user.name.first.toLowerCase().includes(isNameSearch);
    const searchBySurname = user.name.last.toLowerCase().includes(isNameSearch);
    return isNameSearch.length === 0 || searchByName || searchBySurname;
  };

  const filterUsers = users
    .filter(user => sortByUser(user))
    .sort((currentUser, nextUser) => compareUsers(currentUser, nextUser));

  if (isLoading) {
    return (
      <>
        <div className="filters">
          <Input value={searchUser} onChange={e => setSearchUser(e.target.value)} />
          <Select onChange={e => setSelect(e.target.value)} />
        </div>

        <div className="users-list">
          <ul className="user-card">
            {filterUsers.map(user => (
              <Card key={user.login.uuid} user={user} />
            ))}
          </ul>
        </div>
      </>
    );
  }
  
  
    
  
}

export default App;
