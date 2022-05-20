import React, { Component, createRef, useState, useEffect } from "react";
import AddModal from "../products/AddModal";
import List from "../products/List";
import "./Index.scss";

export default function Index() {
  // const [curPath, setCurPath] = useState("测试一");
  const [curPath, setCurPath] = useState("testone");
  const tabItem = [
    {
      key: 1,
      strTitle: "测试一",
      strPath: "testone",
      component: () => <List />,
    },
    {
      key: 2,
      strTitle: "测试二",
      strPath: "testtwo",
      component: () => <AddModal />,
    },
  ];
  return (
    <>
      {tabItem.map((item) => (
        <div
          key={item.key}
          style={{ color: curPath === item.strPath ? "#FF7B02" : "#666666" }}
          onClick={() => {
            setCurPath(item.strPath);
          }}
        >
          {item.strPath}
        </div>
      ))}
      <div>{tabItem.find((el) => el.strPath === curPath).component()}</div>
    </>
  );
}
