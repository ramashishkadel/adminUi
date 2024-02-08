import { useEffect, useState } from "react";
import RowListHead from "./components/RowListHead/RowListHead";
import "./App.css";

const App = () => {
  const [data, setData] = useState(null);

  const rowDeleteHandler = (id) => {
    setData(() => data.filter((el) => el.id != id).map((el) => el));
  };

  const selectedRowsDeleteHandler = (data) => {
    setData((prevData) => prevData.filter((row) => !data.includes(row.id)));
  };

  const updateRowHandler = (iData) => {
    const arr = data;
    arr.forEach((el) => {
      if (el.id == iData.id) {
        el.name = iData.name;
        el.email = iData.email;
        el.role = iData.role;
      }
    });
    setData(() => arr);
  };

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(() => data);
      });
  }, []);

  return (
    <RowListHead
      data={data}
      rowDeleteHandler={rowDeleteHandler}
      sRDH={selectedRowsDeleteHandler}
      updateRowHandler={updateRowHandler}
    />
  );
};

export default App;
