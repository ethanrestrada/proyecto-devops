import CrudTableRow from "./CrudTableRow";

export default function CrudTable({ data, setDataToEdit, deleteData }) {
  return (
    <div className="table-container">
      <h3>Tabla de datos</h3>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Direccion de envio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => (
              <CrudTableRow
                key={el.id}
                el={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            ))
          ) : (
            <tr>
              <td colSpan="6">Sin datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
