import Input from "../Input/Input";
import Select from "../Select/Select";

const Filters = ({ value, onChangeSelect, onChangeInput }) => {
  return (
    <>
      <div className="filters">
        <Input searchUser={value} onChange={onChangeInput} />
        <Select onChange={onChangeSelect} />
      </div>
    </>
  );
};

export default Filters;