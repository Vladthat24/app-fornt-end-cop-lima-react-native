import { map } from "lodash";
import React from "react";
import "./TableCategoryAdmin.scss";
import { Image, Table, Button, Icon } from "semantic-ui-react";

export function TableCategoryAdmin(props) {
  //recuperamos los props enviados desde el Pages Admin Categoria
  const { categories, updateCategory, deleteCategory } = props;
  return (
    <Table className="table-category-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Categoria</Table.HeaderCell>
          <Table.HeaderCell>Acciones</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(categories, (category, index) => (
          <Table.Row key={index}>
            <Table.Cell width={2}>
              <Image src={category.image} />
            </Table.Cell>
            <Table.Cell>{category.title}</Table.Cell>

            <Actions
              category={category}
              updateCategory={updateCategory}
              deleteCategory={deleteCategory}
            />
            {/* enviamos props desde CategoriesAdmin */}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function Actions(props) {
  const { category, updateCategory, deleteCategory } = props;

  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateCategory(category)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => deleteCategory(category)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}
