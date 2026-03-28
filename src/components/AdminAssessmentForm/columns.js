export const columns = (isEditable) => [
    {
      field: "outcome",
      headerName: "Outcomes Assessed",
      flex: 2,
      sortable: false,
      editable: false,
  
      renderCell: (params) => {
        const api = params.api;
        const rowIndex =
          api.getRowIndexRelativeToVisibleRows(params.id);
  
        if (rowIndex === 0) return params.value;
  
        const prevRow =
          api.getRow(
            api.getRowIdFromRowIndex(rowIndex - 1)
          );
  
        return prevRow?.outcome === params.value
          ? ""
          : params.value;
      },
    },
    {
      field: "source",
      headerName: "Source of Assessment",
      flex: 1,
      editable: false,
      sortable: false,
    },
    {
      field: "pcs",
      headerName: "PCs Assessed",
      flex: 1,
      editable: false,
      sortable: false,
    },
    {
      field: "byblosSemester",
      headerName: "Semester (Byblos)",
      editable: isEditable,
      sortable: false,
    },
    {
        field: "byblosInstructor",
        headerName: "Instructor (Byblos)",
        editable: true,
        sortable: false,
    },
    {
      field: "byblosReceived",
      headerName: "Received (Byblos)",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      editable: isEditable,
      sortable: false,
    },
    {
      field: "beirutSemester",
      headerName: "Semester (Beirut)",
      editable: isEditable,
      sortable: false,
    },
    {
        field: "beirutInstructor",
        headerName: "Instructor (Beirut)",
        editable: true,
        sortable: false,
    },
    {
      field: "beirutReceived",
      headerName: "Received (Beirut)",
      type: "singleSelect",
      valueOptions: ["Yes", "No"],
      editable: isEditable,
      sortable: false,
    },
  ];
  