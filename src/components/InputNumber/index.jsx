import "./main.css";

function InputNumber({ children, id, min, max, step, handleChange, value }) {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        name={id}
        type="number"
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        value={value ? value : 0}
      ></input>
    </>
  );
}

export default InputNumber;
