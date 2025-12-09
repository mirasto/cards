const Select = ({onChange}) => {
	return (
    <>
      <select className="sort" onChange={onChange}>
        <option value="az">За алфавітом A-Z</option>
        <option value="age">За віком</option>
      </select>
    </>
  );
};

export default Select;