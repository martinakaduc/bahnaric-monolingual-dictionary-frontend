import "./Components/WordList";
import WordList from "./Components/WordList";
import {useLocation} from "react-router-dom";
import {useState, useEffect} from "react";

function Search() {
    const [search, setSearchValue] = useState("");
    const {state} = useLocation();
    console.log(state);
    useEffect(() => {
        const {searchValue} = state;
        setSearchValue(searchValue);
        console.log(`search: ${search}`);
    }, [state])
  return (
    <>
      <div className="search-page main">
        <h1>Kết quả tìm kiếm cho "{search}"</h1>
        <WordList api={search == "" ? null : `https://www.ura.hcmut.edu.vn/bahnar/monolingual-dictionary/api/search?searched_word=${search}`}/>
      </div>
    </>
  );
}

export default Search;
