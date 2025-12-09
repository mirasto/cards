const Input = ({value, onChange}) => {
	return (
    <>
      <input type="text" onChange={onChange} value={value} placeholder="Пошук за ім'ям або прізвищем" className="search" />
    </>
  );
};

export default Input;