import { useState } from "react";

function useForm(initialForm, validateForm, onSubmit) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(form);
    }
  };

  return {
    form,
    errors,
    handleChange,
    handleSubmit,
    setForm,
  };
}

export default useForm;
