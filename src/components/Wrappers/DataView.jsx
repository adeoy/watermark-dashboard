import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import DataTable from "@bit/adeoy.utils.data-table";

const DataView = ({ data, columns, setForm, deleteItem, setModalOpen }) => {
  columns = [
    ...columns,
    {
      title: "Actions",
      format: (row) => (
        <ButtonGroup>
          <Button color="warning" onClick={() => modify(row)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button color="danger" onClick={() => remove(row._id)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  const modify = (row) => {
    setForm(row);
    setModalOpen(true);
  };

  const remove = (_id) => {
    deleteItem(_id);
  };

  return (
    <DataTable
      data={data}
      columns={columns}
      striped={true}
      hover={true}
      responsive={true}
    />
  );
};

export default DataView;
