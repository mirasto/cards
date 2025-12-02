import { useEffect, useState } from 'react';
import { fetchUsers } from './components/service/api';
import Filters from './components/Filters/Filters';
import CardUsers from './components/Card/CardUsers';

function App() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [select, setSelect] = useState('az');

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)


  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const result = await fetchUsers();
        setIsLoading(true);
        setUsers(result);
      } catch (error) {
        setIsLoading(false);
        setIsError(true)
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
  
  if (isError) {
    return (
      <>
        <h1>ERROR PANIK</h1>
      </>
    )
  }

  if (isLoading) {
    return (
      <>
        <Filters searchUser={searchUser}
          onChangeSelect={e => setSelect(e.target.value)}
          onChangeInput={e => setSearchUser(e.target.value)} />
        <CardUsers filterUsers={filterUsers} />
      </>
    );
  }
  
  
    
  
}

export default App;
