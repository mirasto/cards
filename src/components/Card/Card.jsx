const Card = ({user}) => {
	return (
    <>
      <li >
        <img src={user.picture.thumbnail} alt={user.name.first} className="avatar" />

        <div className="user-info">
          <div className="user-name">
            {user.name.first} {user.name.last}
          </div>

          <div className="user-age">Вік: {user.dob.age}</div>

          <div className="user-country">Країна: {user.location.country}</div>
        </div>
      </li>
    </>
  );
};

export default Card;