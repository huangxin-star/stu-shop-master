import React from "react";
import { Statistic, Row, Col, Progress,Card } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import "./Index.scss";
export default function index() {
  return (
    <>
      <div className="progress">
        <Progress type="circle" percent={75} />
        <Progress type="circle" percent={70} status="exception" />
        <Progress type="circle" percent={100} />
      </div>
      <Card className="long-progress">
          <Progress percent={30} />
          <Progress percent={50} status="active" />
          <Progress percent={70} status="exception" />
          <Progress percent={100} />
          <Progress percent={50} showInfo={false} />
      </Card>
    </>
  );
}
