export default function CrudTableRow({ el, setDataToEdit, deleteData }) {
  let { nombre, email, direccion_envio, estado, id } = el;

  return (
    <tr>
      <td>{id}</td>
      <td>{nombre}</td>
      <td>{email}</td>
      <td>{direccion_envio}</td>
      <td>{estado}</td>
      <td>
        <button onClick={() => setDataToEdit(el)}>Editar</button>
        <button onClick={() => deleteData(id)}>Eliminar</button>
      </td>
    </tr>
  );
}
