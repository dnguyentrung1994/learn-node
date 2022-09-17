import "./App.css";
import { Navbar } from "./components/Navbax";
import { NavItem } from "./components/Navitem";
import { useState } from "react";
import axios from "axios";
import { MyTable } from "./components/MyTable";
import { MyTableHeader } from "./components/MyTableHeader";
import { MyTableBody } from "./components/MyTableBody";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const inputSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };
  const search = async () => {
    const response = await axios.get(
      `http://localhost:5000/test/${searchTerm}`
    );

    setSearchResult(response.data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await search();
  };
  return (
    <div className="App">
      <Navbar>
        <NavItem />
      </Navbar>

      <div className="form">
        <form onSubmit={handleSubmit}>
          <span>製品番号： </span>
          <input
            type={"text"}
            title={"製品番号"}
            onChange={inputSearchTerm}
          ></input>
          <button onClick={handleSubmit}>検索</button>
          <button>test</button>
        </form>
      </div>
      {searchResult.length !== 0 && (
        <MyTable>
          <MyTableHeader data={searchResult} />
          <MyTableBody data={searchResult} />
        </MyTable>
      )}
    </div>
  );
}

export default App;
