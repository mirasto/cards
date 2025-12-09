import { useEffect, useState } from 'react';
import { fetchUsers } from '@components/service/api';
import Filters from '@components/Filters/Filters';
import CardUsers from '@components/Card/CardUsers';
import { MoonLoader } from 'react-spinners';

function App() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [select, setSelect] = useState('az');

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const result = await fetchUsers();
        setUsers(result);
      } catch (error) {
        setIsError(true);
        console.log('error', error.message);
      } finally {
        setIsLoading(false)
      }
    };
    fetchUsersData();
  }, []);

  if (isError) {
    return <h1>THIS IS ERROR</h1>;
  }

  if (isLoading) {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MoonLoader color="#ff5c00" loading size={100} speedMultiplier={0.6} />
        </div>
      </>
    );
  }

  if (users.length > 0) {
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

    return (
      <>
        <Filters
          searchUser={searchUser}
          onChangeSelect={e => setSelect(e.target.value)}
          onChangeInput={e => setSearchUser(e.target.value)}
        />
        <CardUsers filterUsers={filterUsers} />
      </>
    );
  } else {
    return (
      <>
        <h1>NOT FOUND DATA</h1>
      </>
    );
  }
}

export default App;
