import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Kitchen from '../kitchen/index';
import Restaurant from '../restaurant/index';
import Review from '../review/index'
import {
  TrademarkOutlined,
  PlusOutlined,
  AlignLeftOutlined,
} from '@ant-design/icons';
import './style.css';

const { Header, Sider, Content } = Layout;

function Dashboard(props) {

  const logout = () => {
    props.authActions.logOut(props.history);
  }

    return (
      <div>
        {/* <Navbar /> */}
        <Layout>
          <Sider trigger={null} collapsible >
            <div className="" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} className="was">
              <Menu.Item key="1" icon={<PlusOutlined />} >
                <Link to='/dashboard/kitchen'>Кухни</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<TrademarkOutlined />}>
                <Link to='/dashboard/restaurant'>Рестораны</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<AlignLeftOutlined />}>
                <Link to ='/dashboard/review'>Отзывы</Link>
              </Menu.Item>
              <Button onClick={() => logout()} type="primary" style={{margin: `10px 0 0 25px`}}>
                LOGOUT
              </Button>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
              })} */}
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                fontSize: `19px`,
                backgroundColor: `#d1d1d1d1`,
                minHeight: `100vh`,
              }}
            >
              <Route exact path='/dashboard/kitchen' component={Kitchen} />
              <Route exact path='/dashboard/restaurant' component={Restaurant} />
              <Route exact path='/dashboard/review' component={Review} />
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }

  const mapStateToProps = state => ({
    error: state.auth.error,
    isLoading: state.auth.isLoading
  })

  const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)
  })


export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Dashboard));