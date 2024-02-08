import { useState, useEffect } from "react";
import Notifications from "../Notifications/Notifications";
import Modal from "../Modal/Modal";
import Backdrop from "../Backdrop/Backdrop";
import { FaEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./RowListData.css";

const RowListData = ({
  tableData,
  rowDeleteHandler,
  sRDH,
  updateRowHandler,
  selectAllRows,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState([]);
  const [rowId, setRowId] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [deleteMultiple, setDeleteMultiple] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editableRowId, setEditableRowId] = useState(null);
  const [notMsg, setNotMsg] = useState("");

  const [rowData, setRowData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    setDeleteMultiple([]);
    setEditableRowId(null);

    if (selectAllRows) {
      const allRowIds = tableData.map((row) => row.id);
      setSelectedRows(allRowIds);
      setDeleteMultiple(allRowIds);
    }

    if (!selectAllRows) {
      setSelectedRows(() => []);
      setDeleteMultiple(() => []);
    }
  }, [tableData, selectAllRows]);

  const deleteSelecetdHandler = () => {
    if (deleteMultiple.length) {
      setModalMsg(`Are you sure you want to delete Selected rows data ?`);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const rowDeleteApproval = () => {
    if (rowId) rowDeleteHandler(rowId);

    if (deleteMultiple.length) {
      sRDH(deleteMultiple);
      setDeleteMultiple([]);
    }
    setShowModal(false);
    setShowNotifications(() => true);
    setNotMsg(() => "Deleted SuccessFully");
    setTimeout(() => {
      setShowNotifications(() => false);
    }, 2000);
  };

  function toggleRowSelection(rowId) {
    setEditableRowId(null);
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowId)) {
        return prevSelectedRows.filter((id) => id !== rowId);
      } else {
        return [...prevSelectedRows, rowId];
      }
    });
  }

  const editClickHandler = (rowId) => {
    setEditableRowId(rowId === editableRowId ? null : rowId);
    const name = tableData?.find((el) => el.id === rowId)?.name || "";
    const email = tableData?.find((el) => el.id === rowId)?.email || "";
    const role = tableData?.find((el) => el.id === rowId)?.role || "";
    setRowData((prev) => {
      return { ...prev, id: rowId, name: name, email: email, role: role };
    });
  };

  const rownameHandler = (e) => {
    setRowData((prev) => {
      return { ...prev, name: e.target.value };
    });
  };

  const rowemailHandler = (e) => {
    setRowData((prev) => {
      return { ...prev, email: e.target.value };
    });
  };

  const rowroleHandler = (e) => {
    setRowData((prev) => {
      return { ...prev, role: e.target.value };
    });
  };

  const saveClickHandler = () => {
    setShowNotifications(() => true);
    setNotMsg(() => "Updated SuccessFully");
    setTimeout(() => {
      setShowNotifications(() => false);
    }, 2000);
    updateRowHandler(rowData);
    setEditableRowId(null);
  };

  return (
    <>
      <tbody>
        {!tableData.length && (
          <tr style={{ width: "100%" }}>
            <td>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginLeft: "-82px",
                }}
              >
                Couldn't find anything
              </div>
            </td>
          </tr>
        )}
        {tableData?.map((row) => {
          const isSelected = selectedRows.includes(row.id);
          let isEditable = row.id === editableRowId;

          const rowDeleteHandler = () => {
            setRowId(row.id);
            setModalMsg(`Are you sure you want to delete ${row.name}'s data ?`);
            setShowModal(true);
          };

          const rowSelectorHandler = () => {
            setDeleteMultiple((prev) => [...prev, row.id]);
            toggleRowSelection(row.id);
          };

          return (
            <tr
              key={row.id}
              style={{ background: isSelected && "rgba(0,0,0,0.1)" }}
            >
              <td>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={rowSelectorHandler}
                  style={{ backgroundColor: "black" }}
                />
              </td>
              <td>
                {isEditable ? (
                  <input value={rowData.name} onChange={rownameHandler} />
                ) : (
                  row.name
                )}
              </td>
              <td>
                {isEditable ? (
                  <input value={rowData.email} onChange={rowemailHandler} />
                ) : (
                  row.email
                )}
              </td>
              <td>
                {isEditable ? (
                  <input value={rowData.role} onChange={rowroleHandler} />
                ) : (
                  row.role
                )}
              </td>
              <td className="action_cont">
                {isEditable ? (
                  <button onClick={saveClickHandler}>
                    <FaCheckCircle color="#15cf81" />
                  </button>
                ) : (
                  <button onClick={() => editClickHandler(row.id)}>
                    <FaEdit />
                  </button>
                )}
                <button onClick={rowDeleteHandler}>
                  <MdDelete />
                </button>
              </td>
            </tr>
          );
        })}
        <tr>
          <td className="delete_selected__cont">
            <button
              onClick={deleteSelecetdHandler}
              style={{ display: "flex", alignItems: "center" }}
            >
              <span style={{ marginRight: "0.5rem" }}>Delete Selected</span>{" "}
              <MdDelete size={20} />
            </button>
          </td>
        </tr>
        {showModal && (
          <tr>
            <td>
              <Modal
                msg={modalMsg}
                cancel={closeModal}
                ok={rowDeleteApproval}
              />
            </td>
          </tr>
        )}
        {showModal && (
          <tr>
            <td>
              <Backdrop />
            </td>
          </tr>
        )}
        {showNotifications && (
          <tr>
            <td>
              <Notifications
                msg={notMsg}
                error={false}
                showNotifications={showNotifications}
              />
            </td>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default RowListData;
