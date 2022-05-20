import React, { Component, createRef, useState, useEffect } from "react";
import { Form, Card, Input, Button, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { serverUrl } from "../../../utils/config";
import "./edit.scss";
export default function Edit(props) {
  const [form] = Form.useForm();
  const boxRef = createRef();
  const gsRef = createRef();
  const sonRef = createRef();
  const h2Ref = createRef();
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    // const response = await fetch('http://localhost:3333/addUser')
    // const data = await response.json()
    //   console.log(data);
  };
  const text = (<p>我是文本内容</p>);

  useEffect(() => {
    h2Ref.current.innerHTML =
      "box offsetHeight:" +
      boxRef.current.offsetHeight +
      "box scrollHeight:" +
      boxRef.current.scrollHeight +
      "son offsetHeight:" +
      sonRef.current.offsetHeight;
  });
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
      <div className="box" ref={boxRef}>
        <div className="son" ref={sonRef}>
          <div className="gs" ref={gsRef}></div>
        </div>
      </div>
      <h2 ref={h2Ref}>www</h2>
      {text}
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={serverUrl + "/houses/image"}
        onChange={(info) => handleChange(info)}
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
