import { React, useEffect, useState, useRef } from "react";
import { Card, Table, Button, Popconfirm, Checkbox } from "antd";
import axios from "axios";
import { serverTest } from "../../../utils/config";
import { Tag, Divider, Modal, message, Form } from "antd";
import useForm from "antd/lib/form/hooks/useForm";
import AddModal from "./AddModal";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
export default function List(props) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({ page_index: 1, page_size: 10 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = useForm();
  const modalRef = useRef();
  const [selectRows, setSelectRows] = useState([]);
  const { Search } = Input;
  const HeaderRightList = [
    [
      { key: "legalPerson", label: "注册时间" },
      { key: "secondObj", label: "参与时间" },
    ],
    [
      { key: "legalPerson", label: "注册时间" },
      { key: "secondObj", label: "参与时间" },
    ],
  ];
  const contrastList = [
    { key: "legalPerson", label: "相反" },
    { key: "secondObj", label: "相反二号" },
  ];
  const stringHandle = () => {
    let string = "huang:xin:i,love,you";
    console.log(string.split(":", 2));
  };
  const filterHandle = () => {
    const arrObj = [
      {
        name: "黄鑫",
        sex: "male",
      },
      {
        name: "lv",
        sex: "female",
      },
      {
        name: "lucy",
        sex: "male",
      },
      {
        name: "luscy",
        sex: "male",
      },
    ];
    const complexObjects = {
      data: {
        staffBehaviourList: [
          {
            id: 1,
            age: 20,
            time: "2022-2-18",
          },
        ],
        staffMoveList: [
          { id: 1, way: "walk" },
          { id: 2, way: "run" },
        ],
      },
      total: 0,
    };
    console.log("complexObjects:", complexObjects);
    var post = { id: 4, title: "Javascript" };
    var comments = [
      { postId: 4, content: "Angular4" },
      { postId: 2, content: "Vue.js" },
      { postId: 3, content: "Node.js" },
      { postId: 4, content: "React.js" },
    ];
    const newComments = comments.filter((item) => item.postId === post.id);
    console.log(newComments);
    const filtered = arrObj.filter((item) => item.sex === "male");
    console.log(filtered);
  };
  const testRef = {
    ref: modalRef,
    method: "get",
  };
  useEffect(() => {
    getGroup();
    stringHandle();
    filterHandle();
  }, [page]);

  const showModal = (res = {}, type) => {
    setIsModalVisible(true);
    modalRef.current.open({ ...res }, type);
    // setData(record)
  };
  const getGroup = async () => {
    const res = await axios.get("http://localhost:8080/area/city", {
      params: {
        level: 1,
      },
    });
    setData(res.data.body);
    console.log(res);
    // axios.get('/api/test1').then(
    //         response=>{
    //             console.log('成功了',response.data);
    //         },
    //         error=>{
    //             console.log('失败了',error)
    //         }
    //     )
  };
  const onRefresh = () => {};
  const onSearch = async (value) => {
    await axios
      .get("http://localhost:8080/area/city", {
        params: {
          level: 1,
          // 上送当前的页码
          // 上送页面的大小
          // 上送输入的value
        },
      })
      .then((res) => {
        console.log(res);
        // setData(res.data.body);
      });
  };

  const delAll = () => {
    Modal.confirm({
      title: "批量删除",
      content: "请确认是否删除",
      onOk: async () => {
        message.success("批量删除成功");
        return;
      },
    });
  };

  const columns = [
    {
      title: "序号",
      key: "id",
      width: 80,
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "城市名称",
      dataIndex: "label",
    },
    {
      title: "城市拼音",
      dataIndex: "pinyin",
    },
    {
      title: "城市简写",
      dataIndex: "short",
    },
    {
      title: "是否出售",
      dataIndex: "onsale",
      render: (text) => {
        return text ? (
          <Tag color="success"> 已售光 </Tag>
        ) : (
          <Tag color="processing">未售光</Tag>
        );
      },
    },
    {
      title: "操作",
      render: (res) => {
        return (
          <div>
            <Button
              size="small"
              type="primary"
              onClick={() => showModal(res, "update")}
            >
              修改
            </Button>
            <Popconfirm
              title="确定删除此项？"
              onCancel={() => {
                console.log("用户取消删除");
              }}
              onConfirm={() => {
                console.log("用户确认删除");
              }}
            >
              <Button
                size="small"
                type="danger"
                style={{
                  margin: "0 1rem",
                }}
              >
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Card
        title="商品列表"
        extra={
          <Button
            type="primary"
            size="small"
            onClick={() => showModal({}, "add")}
          >
            新增
          </Button>
        }
      >
        <Button
          type="danger"
          style={{ marginBottom: "15px" }}
          onClick={delAll}
          disabled={!selectRows?.length}
        >
          批量删除
        </Button>
        <Search placeholder="请根据字段搜索" onSearch={onSearch} enterButton />
        <Table
          columns={columns}
          bordered
          dataSource={data}
          rowKey={"id"}
          rowSelection={{
            type: "checkbox",
            onSelect: (record, selected) => {
              if (selected) {
                console.log(selected);
                console.log(record);
                setSelectRows([...selectRows, record.id]);
              } else {
                const findIndex = selectRows.findIndex(
                  (item) => item === record.id
                );
                console.log("findIndex", findIndex);
                const list = [...selectRows];
                if (findIndex > -1) {
                  list.splice(findIndex, 1);
                } else {
                  list.push(record.id);
                }
                setSelectRows(list);
                console.log(list);
              }
            },
            onSelectAll: (selected, changeRows) => {
              if (selected) {
                setSelectRows([
                  ...selectRows,
                  ...changeRows.map((item) => item.id),
                ]);
                console.log(selected);
              } else {
                setSelectRows([]);
              }
            },
            selectedRowKeys: selectRows,
          }}
        ></Table>
        {/* {HeaderRightList.find((item) => {
          // console.log("循环结果", item[0].label === "注册时间");
          return item[0].label === "注册时间";
        })} */}
        {contrastList.find((item) => {
          console.log(item);
        })}
      </Card>
      <AddModal
        form={form}
        visible={isModalVisible}
        setShow={setIsModalVisible}
        ref={modalRef}
        {...testRef}
        onRefresh={onRefresh}
      ></AddModal>
    </div>
  );
}
