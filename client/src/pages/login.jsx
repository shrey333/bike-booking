import React from "react";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { Link } from "react-router-dom";

function Login() {
  const [form] = Form.useForm();

  const onFinish = (values) => {};

  return (
    <>
      <Row
        align={"middle"}
        onFinish={onFinish}
        justify={"center"}
        style={{ height: "100vh" }}
      >
        <Col xs={18} sm={14} md={12} lg={10} xl={10}>
          <Card>
            <Typography.Title>Login</Typography.Title>
            <Form form={form} layout={"vertical"}>
              <Form.Item
                label={"Email"}
                name={"email"}
                rules={[{ required: true, message: "Please input email" }]}
              >
                <Input placeholder={"Enter email"} />
              </Form.Item>
              <Form.Item
                label={"Password"}
                name={"password"}
                rules={[{ required: true, message: "Please input password" }]}
              >
                <Input.Password placeholder={"Enter password"} />
              </Form.Item>
              <Form.Item>
                <Button type={"primary"} htmlType={"submit"}>
                  Login
                </Button>
              </Form.Item>
              <Form.Item>
                Click here to <Link to={"/signup"}>Sign up</Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Login;
