import "./FormControl.css";

function FormControl({
  label,
  icon,
  type = "text",
  name,
  placeholder = "",
  value,
  onChange,
  errorMessage,
  options = [],
}) {
  return (
    <div className="form-control">
      {label && <label htmlFor={name}>{label}</label>}
      <div
        className="input-control"
        style={{ border: errorMessage ? "1px solid red" : "1px solid #ccc" }}
      >
        {icon && (
          <div
            className="input-icon"
            style={{
              borderRight: errorMessage ? "1px solid red" : "1px solid #ccc",
            }}
          >
            <i className={icon}></i>
          </div>
        )}
        {type === "select" ? (
          <select name={name} id={name} value={value} onChange={onChange}>
            {options.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            name={name}
            id={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
      {errorMessage && <span className="error-message">{errorMessage}*</span>}
    </div>
  );
}

export default FormControl;
