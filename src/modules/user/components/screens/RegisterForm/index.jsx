import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Checkbox } from "antd";
import StyleRegisterForm from "./index.style";
import { register } from "../../../store/services";
import { actions } from "../../../store";
import { Typography } from "antd";
import { useHistory, withRouter } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      if (!validateData()) {
        return;
      }

      const dataRegister = {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
        repassword: userInfo.repassword,
      };
      setMessage("");
      const res = await register(dataRegister);
      if (res.status == "successful") {
        dispatch(actions.setUserData({}));
        history.push({
          pathname: "/login",
          state: { message: "Vui lòng đợi admin duyệt tài khoản!" },
        });
      } else {
        setMessage(res.message);
      }
    } catch (error) {}
  };

  const validateData = useCallback(() => {
    var retval = true;
    if (typeof userInfo.email === "undefined" || userInfo.email === "") {
      retval = false;
      setMessage("Vui lòng nhập email!");
      return retval;
    }
    if (typeof userInfo.password === "undefined" || userInfo.password === "") {
      retval = false;
      setMessage("Vui lòng nhập mật khẩu!");
      return retval;
    }
    if (typeof userInfo.repassword === "undefined") {
      retval = false;
      setMessage("Vui lòng xác nhận mật khẩu!");
      return retval;
    }
    if (userInfo.repassword !== userInfo.password) {
      retval = false;
      setMessage("Xác nhận mật khẩu không đúng!");
      return retval;
    }
    return retval;
  }, [userInfo]);

  return (
    <StyleRegisterForm>
      <Title level={2}>Hệ thống giám sát bằng Drone</Title>
      <h2>Đăng ký</h2>
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item name="name">
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="Name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
        </Form.Item>
        <Form.Item name="email">
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item name="password">
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item name="re-password">
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={userInfo.repassword}
            onChange={(e) =>
              setUserInfo({ ...userInfo, repassword: e.target.value })
            }
          />
        </Form.Item>
        {message && <p className="noti-message">{message}</p>}
        <Form.Item>
          <a className="first-button" onClick={() => history.push("/login")}>
            Đăng nhập
          </a>
          <a
            className="second-button"
            onClick={() => history.push("/forgot-password")}
          >
            Quên mật khẩu
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={handleRegister}
          >
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </StyleRegisterForm>
  );
};

export default RegisterForm;
