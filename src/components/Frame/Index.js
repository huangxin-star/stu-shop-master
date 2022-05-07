import React from "react";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import { withRouter } from "react-router-dom";
import { adminRoutes } from "../../routes";
const { Header, Content, Sider } = Layout;
const routes = adminRoutes.filter((route) => route.isShow);
function index(props) {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <h2 style={{ color: "white" }}>后台管理登录</h2>
          <p style={{ position: "absolute", right: "105px" }}>
            欢迎{window.sessionStorage.getItem("loginName")}登录！
          </p>
          <Button
            type="danger"
            style={{ position: "absolute", right: 2, top: "2%" }}
            onClick={() => {
              window.sessionStorage.removeItem("loginName");
              props.history.push("/login");
            }}
          >
            退出登录
          </Button>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["/admin/dashboard"]}
            // defaultOpenKeys={["/admin/dashboard"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {routes.map((route) => {
              return (
                <Menu.Item
                  key={route.path}
                  onClick={(p) => {
                    props.history.push(p.key);
                  }}
                >
                  {route.title}
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout style={{ padding: "16px" }}>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
export default withRouter(index);
