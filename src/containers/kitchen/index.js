import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Form, Input } from 'antd';
import * as kitchensActions from '../../actions/kitchensActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './kitchen.css'

function Kitchen(props) {

   const [visible, setVisible] = useState(false);
   const [editVisible, setEditVisible] = useState(false);

   const [name, setName] = useState({
      name: " "
   })

   const [editForm, setEditForm] = useState({
      name: ``
   })

   const showVisible = () => {
      setVisible(true)
   }

   useEffect(() => {
      async function fetchData() {
         await props.kitchensActions.getKitchens();
      }
      fetchData()
   }, [props.kitchensActions])

   const data = props.kitchens.map((item, i) => { 
      return { 
         key: i,
         name: item.name,
         id: item.id
      }
   })

   const handleEdit = () => {
      editForm.name && editForm.id && props.kitchensActions.editKitchens(editForm)
      setEditVisible(false)
   }

   const opneEditModal = item => {
      setEditVisible(true)
      setEditForm({ name: item.name, id: item.id })
   }

   const onEditChange = e => {
      const {name, value} = e.target;
      setEditForm(prev => ({
         ...prev,
         [name]: value
      }))
   }

   const formDelete = record => {
      props.kitchensActions.deleteKitchen(record.id)
   }

   const onChangeHandler = e => {
      setName({ name: e.target.value })
   }

   const add = () => {
      props.kitchensActions.postKitchens(name)
      setVisible(false)
   }

   const columns = [
      {
         title: 'ID',
         dataIndex: 'id',
         key: 'ID',
         render: text => <p>{text}</p>,
      },
      {
         title: 'Name',
         dataIndex: 'name',
         key: 'name',
         render: text => <h4>{text}</h4>,
      },
      {
         title: 'Action',
         key: 'action',
         render: (text, record) => (
         <Space size="middle">
            <Button type="link" onClick={() => opneEditModal(record)}>Редактирование</Button> 
            <Button type="link" onClick={() => formDelete(record)}>Удалить</Button>
         </Space> 
         ),
      },
   ];

   return (
      <div>
         <Button onClick={showVisible} type="primary" style={{margin: `0 0 25px 0`}}>
            CREATE KITCHEN
         </Button>
         <Table columns={columns} dataSource={data} />
         <div className={visible ? `modal modal-open` : `modal modal-close`}>
              <div className="modal-backdrop" onClick={() => setVisible(false)}></div>
              <div className="modal-inner">
                 <Form>
                     <Form.Item
                        name="name"
                        rules={[
                           {
                              required: true,
                              message: 'Please input your Kitchen Name!',
                           },
                        ]}
                     >
                     <label>Name:</label>
                     <Input 
                        style={{ margin: `20px 0 20px 0` }} 
                        value={name.name} 
                        onChange={onChangeHandler}
                     />
                        <Button type="default" onClick={() => setVisible(false)} className="btn">
                           CLOSE
                        </Button>
                        <Button type="primary" className="btn" onClick={add}>
                           ADD
                        </Button>
                     </Form.Item>
                  </Form> 
              </div>
            </div>
            <div className={editVisible ? `modal modal-open` : `modal modal-close`}>
              <div className="modal-backdrop" onClick={() => setEditVisible(false)}></div>
              <div className="modal-inner">
                 <Form>
                     <Form.Item
                        name="name"
                        rules={[
                           {
                              required: true,
                              message: 'Please input your username!',
                           },
                        ]}
                     >
                     <label>Name:</label>
                     <Input style={{ margin: `20px 0 20px 0` }} 
                        name="name"
                        value={editForm.name} 
                        onChange={onEditChange}
                     />
                        <Button type="default" onClick={() => setEditVisible(false)} className="btn">
                           CLOSE
                        </Button>
                        <Button type="primary" className="btn" onClick={handleEdit}>
                           EDIT
                        </Button>
                     </Form.Item>
                  </Form> 
              </div>
            </div>
      </div>
   )
}

const mapStateToProps = state => ({
   error: state.kitchen.error,
   isLoading: state.kitchen.isLoading,
   kitchens: state.kitchen.kitchens
})

const mapDispatchToProps = dispatch => ({
   kitchensActions: bindActionCreators(kitchensActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (Kitchen)
