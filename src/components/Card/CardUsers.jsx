import CardItem from "./CardItem";

const CardUsers = ({filterUsers}) => {
	return (
    <>
      <div className="users-list">
        <ul className="user-card">
          {filterUsers.map(user => (
						<CardItem key={user.login.uuid} user={user} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default CardUsers;