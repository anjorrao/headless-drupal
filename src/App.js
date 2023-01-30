import { useEffect, useState } from "react";
import styles from "./App.css";

const API = "http://localhost/drupal-demo/jsonapi/node/employees";

function App() {
  const [query, setQuery] = useState("");
  const [drupData, setData] = useState([]);

  const getDrupData = () => {
    fetch(`${API}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getDrupData();
  }, []);

  const updateQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className={`App`}>
      <h1>Employee Information</h1>
      <input placeholder="Search an employee..." onChange={updateQuery}></input>
      <div className="employees">
        {drupData.length === 0 && <p className="white-text">Loading....</p>}
        {drupData.length !== 0 && (
          <div className="wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                </tr>
              </thead>
              <tbody>
                {drupData
                  .filter((item) => {
                    return query.toLowerCase() === ""
                      ? item
                      : item.attributes.field_first_name
                          .toLowerCase()
                          .includes(query) ||
                          item.attributes.field_last_name
                            .toLowerCase()
                            .includes(query);
                  })
                  .map((item) => (
                    <tr key={item.attributes.field_employee_id}>
                      <td>{item.attributes.field_employee_id}</td>
                      <td>{item.attributes.field_first_name}</td>
                      <td>{item.attributes.field_last_name}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
