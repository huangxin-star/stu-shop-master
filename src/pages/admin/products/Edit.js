import React, { Component,useState } from "react";
import { Form, Card, Input, Button, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { serverUrl } from "../../../utils/config";
export default function Edit(props) {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    // const response = await fetch('http://localhost:3333/addUser')
    // const data = await response.json()
    //   console.log(data);
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}{" "}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      setLoading(false);
      console.log(info);
      setImageUrl(info.file.response.body[0]);
    }
  };
  return (
    <Card title="商品管理">
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        form={form}
      >
        <Form.Item
          label="名字"
          rules={[{ required: true, message: "商品名字不能为空" }]}
        >
          <Input
            type="text"
            placeholder="请输入商品名字"
            name="username"
          ></Input>
        </Form.Item>
        <Form.Item
          label="密码"
          rules={[{ required: true, message: "商品名字不能为空" }]}
        >
          <Input
            type="text"
            placeholder="请输入商品名字"
            name="password"
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            保存
          </Button>
        </Form.Item>
      </Form>
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={serverUrl + '/houses/image'}
        onChange={(info) =>handleChange(info)}
      >
        {imageUrl ? (
          <img
            src={serverUrl + imageUrl}
            alt="avatar"
            style={{ width: "100%" }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </Card>
  );
}
