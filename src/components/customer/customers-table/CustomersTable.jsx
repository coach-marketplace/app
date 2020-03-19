import React, { Component } from "react";
import { Table, Popover, Position, Menu, Text, IconButton } from "evergreen-ui";

import Avatar from "../../ui/avatar/Avatar";
// import Button from "../../ui/button/Button";

class CustomersTable extends Component {
  renderRowMenu = () => {
    return (
      <Menu>
        <Menu.Group>
          <Menu.Item>Details</Menu.Item>
        </Menu.Group>
        <Menu.Divider />
        <Menu.Group>
          <Menu.Item intent="danger">Delete</Menu.Item>
        </Menu.Group>
      </Menu>
    );
  };

  renderRow = customer => {
    return (
      <Table.Row key={customer._id}>
        <Table.Cell display="flex" alignItems="center">
          <Avatar name={customer.name} size={26} />
          <Text marginLeft={8} size={300} fontWeight={500}>
            {customer.name}
          </Text>
        </Table.Cell>
        <Table.TextCell>{customer.email}</Table.TextCell>
        <Table.TextCell isNumber>{customer.phone}</Table.TextCell>
        <Table.Cell width={48} flex="none">
          <Popover
            content={this.renderRowMenu}
            position={Position.BOTTOM_RIGHT}
          >
            <IconButton icon="more" height={24} appearance="minimal" />
          </Popover>
        </Table.Cell>
      </Table.Row>
    );
  };

  render() {
    return (
      <Table border>
        <Table.Head>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Phone</Table.HeaderCell>
          {/* <Table.HeaderCell size={48}>
            <Button>New</Button>
          </Table.HeaderCell> */}
          <Table.HeaderCell width={48} flex="none" />
        </Table.Head>
        <Table.VirtualBody height={640}>
          {this.props.customers.map(customer => this.renderRow(customer))}
        </Table.VirtualBody>
      </Table>
    );
  }
}

export default CustomersTable;

CustomersTable.displayName = "CustomersTable";
