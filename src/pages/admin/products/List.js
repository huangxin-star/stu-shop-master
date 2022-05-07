import { React, useEffect, useState, useRef } from "react";
import {
  Card,
  Table,
  Button,
  Popconfirm,
  Checkbox 
} from "antd";
import axios from "axios";
import { Tag, Divider, Modal,message } from "antd";
import useForm from "antd/lib/form/hooks/useForm";
import AddModal from "./AddModal";
export default function List(props) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({ page_index: 1, page_size: 10 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = useForm();
  const modalRef = useRef();
  const [selectRows,setSelectRows] = useState([]);
  useEffect(() => {
    getGroup()
  }, [page]);
 
  const showModal = (res = {}, type) => {
    setIsModalVisible(true);
    modalRef.current.open({ ...res }, type);
    // setData(record)
  };
  const getGroup = async () => {
    const res = await axios.get("http://localhost:8080/area/city",{
      params:{
        level : 1
      }
    });
    setData(res.data.body);
    console.log(res);
  }
  const onRefresh = () => {
    
  }

  const delAll = () => {
    Modal.confirm({
      title:'批量删除',
      content:'请确认是否删除',
      onOk:async()=>{
        message.success('批量删除成功')
        return
      }
    })

  }

 
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
       <Button type="danger" style={{marginBottom:'15px'}} onClick={delAll} disabled={!selectRows?.length}>批量删除</Button>
        <Table
          columns={columns}
          bordered
          dataSource={data}
          rowKey={"id"}
          rowSelection={{
            type: 'checkbox',
            onSelect:(record,selected) => {
              if(selected){
                console.log(selected);
                console.log(record);
                setSelectRows([...selectRows,record.id])
              }else{
                const findIndex = selectRows.findIndex(item => item === record.id)
                console.log('findIndex',findIndex);
                const list = [...selectRows]
                if (findIndex > -1) {
                  list.splice(findIndex, 1)
                }else{
                  list.push(record.id)
                }
                setSelectRows(list)
                console.log(list);
              }
            },
            onSelectAll:(selected,changeRows) => {
              if(selected){
                setSelectRows([...selectRows,...changeRows.map(item => item.id)])
                console.log(selected);
              }else{
                setSelectRows([])
              }
            },
            selectedRowKeys:selectRows
          }}
        ></Table>
      </Card>
      <AddModal
        form={form}
        visible={isModalVisible}
        setShow={setIsModalVisible}
        ref={modalRef}
        onRefresh={onRefresh}
      ></AddModal>
    </div>
  );
}
