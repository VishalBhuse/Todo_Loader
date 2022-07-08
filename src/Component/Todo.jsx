import React, { useState } from "react";
import { useEffect } from "react";

export const Todo = () => {
  const [data, setdata] = useState([]);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);

  let getData = async (page) => {
    try{
        setloading(true);
        let res = await fetch(
            `http://localhost:8080/posts?_page=${page}`
            );
            let data = await res.json();
            setdata(data);
            setloading(false)
        }
        catch(err){
            setloading(false)
            console.log(err)
        }
  };

  useEffect(() => {
    getData(page);
  }, [page]);

  return (
    <div>
      <h2>Todo List</h2>
      <h3>Env{process.REACT_APP_URL}</h3>
      <div style={{ display: "flex", gap: "2rem" ,justifyContent:"center"}}>
      <button disabled={page === 1} onClick={() => setpage(page - 1)}>
        Next
      </button>
      <span>{page}</span>
      <button onClick={() => setpage(page + 1)}>Prev</button>
      </div>
      <div>
        
      {loading && <h2>Loading...</h2> }
      </div>

      {data.map((el) => (
        <div key={el.id} style={{ display: "flex", gap: "1rem" }}>
          <p>{el.id}.</p>
          <p>{el.title}</p>
        </div>
      ))}
    </div>
  );
};
