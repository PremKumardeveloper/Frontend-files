import { useState } from 'react';
import { Data } from './Data';
import './App.css';

function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="container">
      <h1>Data Filter</h1>
      
      <form>
        <input 
          type="text" 
          onChange={(e) => setSearch(e.target.value.toLowerCase())}  
          placeholder="Search by first name..." 
        />
      </form>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {Data.filter((item) => 
            item.first_name.toLowerCase().includes(search)
          ).map((item, index) => (
            <tr key={index}>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
