import React, { Fragment, useCallback, useEffect, useState } from "react";
import StyleListUser from "./index.style";
import {
  Table,
  Tag,
  Space,
  Col,
  Input,
  Row,
  Select,
  Button,
  Modal,
  Form,
  DatePicker,
} from "antd";
import { getUser, updateUser, createUser } from "../../store/services";
import UploadImage from "./UploadImage";

const { Search } = Input;
const { Option } = Select;
const userHost = "https://distributed.de-lalcool.com/";
const statuses = [
  {
    name: "Hoặt động",
    code: "ACTIVE",
  },
  {
    name: "Chờ xác nhận",
    code: "PENDING",
  },
];

const roles = [
  {
    name: "Quản trị viên",
    code: "ADMIN",
  },
  {
    name: "Nhân viên",
    code: "MEMBER",
  },
];

const ListUser = () => {
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState({ page_size: 20, page_id: 0 });
  const [listUser, setListUser] = useState([]);
  const [meta, setMeta] = useState([]);
  const [user, setUser] = useState({});
  const [type, setType] = useState();

  const fetchUser = useCallback(async () => {
    const res = await getUser(filter);
    setMeta(res.meta);
    setListUser(res.result);
  }, [filter]);

  useEffect(() => {
    if (!visible) {
      setUser({});
    }
  }, [visible]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleEdit = (recod, type) => {
    setVisible(true);
    setType(type);
    setUser(recod);
  };

  const handleDelete = () => {
    setVisible(true);
  };

  const columns = [
    {
      title: "#",
      render: (text, record, index) => <a>{index + 1}</a>,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status == "ACTIVE" ? "success" : "geekblue"} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Chức vụ",
      key: "role",
      dataIndex: "role",
      render: (role) => (
        <Tag color={role == "ADMIN" ? "orange" : "geekblue"} key={role}>
          {role}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Fragment>
          <Space size="middle" style={{ marginRight: 10 }}>
            <a onClick={() => handleEdit(record, "user")}>Edit</a>
          </Space>
          <Space size="middle">
            <a onClick={handleDelete}>Delete</a>
          </Space>
        </Fragment>
      ),
    },
  ];

  const renderSelectStatus = (type) => (
    <Select
      className="select-box"
      value={user?.status}
      onChange={(value) => {
        type == "user"
          ? setUser({ ...user, status: value })
          : setFilter({ ...filter, status: value });
      }}
      defaultValue="Chưa xác định"
      style={{ width: "100%" }}
    >
      {statuses.map((status, index) => {
        return (
          <Option key={index} value={status.code}>
            {status.name}
          </Option>
        );
      })}
    </Select>
  );

  const renderSelectRole = (type) => (
    <Select
      className="select-box"
      value={user?.role}
      onChange={(value) => {
        type == "user"
          ? setUser({ ...user, role: value })
          : setFilter({ ...filter, role: value });
      }}
      defaultValue="Chưa xác định"
      style={{ width: "100%" }}
    >
      {roles.map((status, index) => {
        return (
          <Option key={index} value={status.code}>
            {status.name}
          </Option>
        );
      })}
    </Select>
  );

  const changePagination = (value) => {
    setFilter({ ...filter, page_id: value });
  };

  const handleSave = async () => {
    var res = {};
    if (type == 'update') {
      res = await updateUser(user);
    } else {
      res = await createUser(user);
    }
    if (res.status === 'successful') {
      handleClose();
    } else {

    }
  };

  const handleClose = () => {};

  return (
    <StyleListUser>
      <Row gutter={[16, 16]}>
        <Col span={12}>List Users</Col>
        <Col flex="right" span={2} offset={10}>
          <Button block type="primary" onClick={() => setVisible(true)}>
            New User
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Search />
        </Col>
        <Col span={7}>{renderSelectStatus("filter")}</Col>
        <Col span={7}>{renderSelectRole("filter")}</Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <DatePicker style={{ width: "100%" }} />
        </Col>
      </Row>
      <Row>
        <Col span={2} style={{ display: "flex", margin: "0 auto" }}>
          <Button type="primary" block style={{ marginBottom: 10 }}>
            Reset
          </Button>
        </Col>
      </Row>
      <Table
        rowKey="id"
        columns={columns}
        pagination={{
          total: meta.total_count,
          pageSize: meta.page_size,
          onChange: changePagination,
        }}
        dataSource={listUser}
      />

      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        title="Add new item"
        onOk={handleSave}
        onCancel={handleClose}
        okText="Lưu"
      >
        <Form form={form}>
          <Row gutter={[16, 16]}>
            <Form.Item name="name" style={{ width: "45%", marginRight: 10 }}>
              <label htmlFor="">Tên:</label>
              <Input
                className="input-box"
                placeholder="Tên"
                value={user?.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </Form.Item>
            <Form.Item name="email" style={{ width: "45%" }}>
              <label htmlFor="">Email</label>
              <Input
                className="input-box"
                type="email"
                placeholder="Email"
                value={user?.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </Form.Item>
          </Row>
          <Row gutter={[16, 16]}>
            <Form.Item name="phone" style={{ width: "45%", marginRight: 10 }}>
              <label htmlFor="">Sdt:</label>
              <Input
                className="input-box"
                placeholder="Số điện thoại"
                value={user?.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </Form.Item>
            <Form.Item name="address" style={{ width: "45%" }}>
              <label htmlFor="">Address</label>
              <Input
                className="input-box"
                type="text"
                placeholder="Địa chỉ"
                value={user?.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            </Form.Item>
          </Row>
          <Row gutter={[16, 16]}>
            <Form.Item name="status" style={{ width: "45%", marginRight: 10 }}>
              <label htmlFor="">Trạng thái:</label>
              {renderSelectStatus("user")}
            </Form.Item>
            <Form.Item name="role" style={{ width: "45%" }}>
              <label htmlFor="">Chức vụ</label>
              {renderSelectRole("user")}
            </Form.Item>
          </Row>
          <Row>
            <Form.Item name="status" style={{ margin: "0 auto" }}>
              <label htmlFor="">Avatar</label>
              <UploadImage imageUrl={user.avatar ? userHost + user.avatar : `/images/blank.png`} />
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </StyleListUser>
  );
};
export default ListUser;
