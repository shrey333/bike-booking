import React from "react";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { Link } from "react-router-dom";

function SignUp() {
  const [form] = Form.useForm();

  return (
    <>
      <Row align={"middle"} justify={"center"} style={{ height: "100vh" }}>
        <Col xs={18} sm={14} md={12} lg={10} xl={10}>
          <Card>
            <Typography.Title>Sign Up</Typography.Title>
            <Form form={form} layout={"vertical"}>
              <Form.Item
                label={"First Name"}
                name={"firstName"}
                rules={[{ required: true, message: "Please input First Name" }]}
              >
                <Input placeholder={"Enter first name"} />
              </Form.Item>
              <Form.Item
                label={"Last Name"}
                name={"lastName"}
                rules={[{ required: true, message: "Please input Last Name" }]}
              >
                <Input placeholder={"Enter last name"} />
              </Form.Item>
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
                  Sign up
                </Button>
              </Form.Item>
              <Form.Item>
                Click here to <Link to={"/login"}>Login</Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default SignUp;
