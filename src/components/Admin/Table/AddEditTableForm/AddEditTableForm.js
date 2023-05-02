import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTable } from "../../../../hooks/useTable"; //llama al clase general
import "./AddEditTableForm.scss";

export function AddEditTableForm(props) {
  const { onClose, onRefetch, table } = props;
  const { addTables, updateTables } = useTable();
  console.log(table); //valor del table de contentModal de TablesAdmin
  //objeto
  const formik = useFormik({
    initialValues: initialValues(table),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (table) await updateTables(table.id, formValue);
      else await addTables(formValue);

      onRefetch();
      onClose();
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="number"
        type="number"
        placeholder="Numero de mesas"
        value={formik.values.number}
        onChange={formik.handleChange}
        error={formik.errors.number}
      />
      <Button type="submit" primary fluid content="Crear" />
    </Form>
  );
}

function initialValues(data) {
  return {
    number: data?.number || "",
  };
}

function validationSchema() {
  return {
    number: Yup.number().required(true),
  };
}
