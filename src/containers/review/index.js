import React, {useState, useEffect} from 'react';
import {bindActionCreators} from "redux";
import {Col, Card, Row, Button, Modal, Input} from 'antd'
import {connect} from "react-redux";
import * as reviewActions from '../../actions/reviewActions';

function Review(props) {

   const {Meta} = Card;
   
   const [modalVisible, setModalVisible] = useState(false)
   const [formData, setFormData] = useState({
      id: '',
      text: '',
      restaurantId: '',
      createdAt: '',
      userId: ''
   })

   const showModal = () => {
      setModalVisible(true)
   };

   const handleOk = e => {
      console.log(e);
      setModalVisible(false)
      props.reviewActions.addReview(formData)
   };

   const handleCancel = e => {
      console.log(e);
      setModalVisible(false)
   };
  
   const onChangeHandler = e => {
      setFormData({ text: e.target.value })
   }

   const onCancelId = e => {
      setFormData({ restaurantId: e.target.value })
   }

   useEffect(() => {
      async function fetchData() {
         await props.reviewActions.getReview()
      }
      fetchData()
   }, [props.reviewActions])

   console.log(props.reviewActions)

   const deleteForm = item => {
      console.log(item)
      props.reviewActions.deleteReview(item.id)
   }

   const data = props.reviews.map((item, i) => {
      return(
         <Col>
            <Meta id={item.id}/>
            <Card>
               <Meta title={item.text}/>
               <Meta title={item.restaurantId}/>
               <Meta title={item.createdAt}/>
               <Meta title={item.userId}/>
               <Button type="default" onClick={() => deleteForm(item)}>DELETE</Button>
            </Card>
         </Col>
      )   
   })

   return (
      <div>
         <Button type="primary" style={{ margin: `0 0 30px 0` }} onClick={showModal}>Добавить Отзыв</Button>
         <Row gutter={20}>
            {data}
         </Row>
         <Modal
            title="Отзыв"
            visible={modalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
         >
            <label>Ваш отзыв</label>
            <Input onChange={onChangeHandler}/>

            <label>ID Ресторана</label>
            <Input onChange={onCancelId}/>
        </Modal>
      </div>
   )
}

const mapStateToProps = state => ({
   error: state.restaurant.error,
   reviews: state.review.reviews
})

const mapDispatchToProps = dispatch => ({
   reviewActions: bindActionCreators(reviewActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps) (Review)
