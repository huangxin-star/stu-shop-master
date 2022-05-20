import React from 'react'
import { Form, Input, Button, Checkbox,Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.scss'
export default function Login(props) {
  const [form] = Form.useForm();
    const onFinish = async(values) => {   
      try {
        const response = await fetch('http://localhost:4550/login')
        const data = await response.json()
        console.log(data);
        if (data.code === 200){
          props.history.push('./admin/dashboard')
          window.sessionStorage.setItem('loginName',data.data.username)
        }
      } catch (error) {
        console.log('请求出错');
      }
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    return (
      <Card className="login-card">
        <h3>登陆界面</h3>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      form={form}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
        initialValue="huangxin"
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
        initialValue="123456"
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          忘记密码
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
        Or <a href="">现在注册！</a>
      </Form.Item>
    </Form>
  </Card>
  );
}

