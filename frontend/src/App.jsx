import { useEffect, useState } from "react";
import { helpHttp } from "./helpers/helpHttp";
import CrudTable from "./components/CrudTable";
import CrudForm from "./components/CrudForm";
import Loader from "./components/Loader";
import Message from "./components/Message";
import "./App.css";

function App() {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let api = helpHttp();
  // let url = "http://host.docker.internal:3001/clientes";
  // let url = "http://localhost:3001/clientes";
  const apiBase = window.location.origin.includes("tienda.local")
    ? "https://tienda.local123"
    : "https://tienda-api.duckdns.org";

  let url = `${apiBase}/api/clientes`;

  // let url = "https://tienda.local/api/clientes";
  // let url = "https://tienda.local/api";

  useEffect(() => {
    setIsLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setDb(res);
        } else {
          setDb(null);
          setError(res);
        }
        setIsLoading(false);
      });
  }, [url]);

  const createData = (data) => {
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      if (!res.err) {
        setDb([...db, res]);
      } else {
        setError(res);
      }
    });
  };

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      if (!res.err) {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb(newData);
      } else {
        setError(res);
      }
    });
  };

  const deleteData = (id) => {
    let isDelete = confirm(
      "¿Estas seguro de eliminar el registro con el id" + id + "?"
    );

    if (!isDelete) return;

    let options = {
      headers: { "content-type": "application/json" },
    };

    let endpoint = `${url}/${id}`;
    api.del(endpoint, options).then((res) => {
      if (!res.err) {
        let newData = db.filter((el) => el.id !== id);
        setDb(newData);
      } else {
        setError(res);
      }
    });
  };

  return (
    <div>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {db && (
          <CrudTable
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}
        {isLoading && <Loader />}
        {error && (
          <Message
            message={`Error ${error.status}: ${error.statusText}`}
            bgColor="#dc3545"
          />
        )}
      </article>
    </div>
  );
}

export default App;
