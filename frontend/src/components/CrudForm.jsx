import { useEffect } from "react";
import FormControl from "./FormControl";
import useForm from "../hooks/useForm";

const initialForm = {
  id: null,
  nombre: "",
  email: "",
  direccion_envio: "",
  estado: 1,
};

let selectOptions = [
  { value: 0, label: "Inactivo" },
  { value: 1, label: "Activo" },
];

const validateForm = (form) => {
  let errors = {};

  if (!form.nombre.trim()) {
    errors.nombre = "El nombre es obligatorio";
  }

  if (!form.direccion_envio.trim()) {
    errors.direccion_envio = "La dirección es obligatoria";
  }

  // Email
  if (!form.email.trim()) {
    errors.email = "El email es obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
    errors.email = "El email no tiene un formato válido";
  }

  return errors;
};

export default function CrudForm({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
}) {
  const onSubmit = () => {
    if (form.id == null) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset();
  };

  const handleReset = () => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  const { setForm, form, errors, handleChange, handleSubmit } = useForm(
    initialForm,
    validateForm,
    onSubmit
  );

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit, setForm]);

  return (
    <div>
      <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
      <span>cambio aquiiiiiiiiiiiiii 3</span>
      <form onSubmit={handleSubmit}>
        <FormControl
          icon="fa-solid fa-user"
          label="Estado"
          type="text"
          placeholder="Nombre"
          name="nombre"
          onChange={handleChange}
          value={form.nombre}
          errorMessage={errors.nombre}
        />
        <FormControl
          icon="fa-solid fa-envelope"
          label="Email"
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={form.email}
          errorMessage={errors.email}
        />
        <FormControl
          icon="fa-solid fa-location-dot"
          label="Dirección de envio"
          type="text"
          placeholder="Dirección de envio"
          name="direccion_envio"
          onChange={handleChange}
          value={form.direccion_envio}
          errorMessage={errors.direccion_envio}
        />
        <FormControl
          icon="fa-solid fa-list"
          label="Estado"
          type="select"
          name="estado"
          value={form.estado}
          onChange={handleChange}
          errorMessage={errors.estado}
          options={selectOptions}
        />
        <input type="submit" value="Enviar" />
        <input type="reset" value="Limpiar" onClick={handleReset} />
      </form>
    </div>
  );
}
