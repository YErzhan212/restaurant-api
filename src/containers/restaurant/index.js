import React, {useEffect, useState} from "react";
import {Card, Row, Col, Button, Input, Form, Select, Modal, Upload, message, Pagination} from 'antd';
import {bindActionCreators} from "redux";
import * as kitchensActions from "../../actions/kitchensActions";
import {connect} from "react-redux";
import * as restaurantActions from "../../actions/restaurantActions";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';

const {Option} = Select;

function Restaurant(props) {

    const [modalVisible, setModalVisible] = useState(false)
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [imageUrl, setImageUrl] = useState(``)
    const [searchReq, setSearchReq] = useState("")
    const [search, setSearch] = useState({
        query: ``,
        page: 1
    })
    const [image, setImage] = useState(``)
    const [loading, setLoading] = useState(false)
    const [kitchens, setKitchens] = useState([])
    const [formdata, setFormData] = useState({
        id: "",
        name: "",
        phone: "",
        location: "",
        amountOfPlace: "",
        image: "",
        averageBill: "",
        kitchens: [],
        rate: ""
    })
    const [editForm, setEditForm] = useState({
        id: "",
        name: "",
        phone: "",
        location: "",
        amountOfPlace: "",
        image: "",
        averageBill: "",
        kitchens: [],
        rate: ""
    })

    const showEditVisible = () => {
        setEditModalVisible(true)
    }
    
    const handlerEdit = () => {
        editForm.name && editForm.id && props.restaurantActions.editRestaurant(editForm)
        setEditModalVisible(false)
    }

    const onEditChange = e => {
        const {value, name} = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const okHandler = () => {
        setModalVisible(false)
        console.log({...formdata, image, kitchens})
        props.restaurantActions.addRestaurant({...formdata, image, kitchens});
    }

    const { Meta } = Card;

    const  getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!');
            }
        const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Image must smaller than 2MB!');
            }
        return isJpgOrPng && isLt2M;
    }

    const modalVisibleHandler = () => {
        props.kitchensActions.getKitchens();
        setModalVisible(true)
    }


    const searchHandler = (e) => {
        setSearchReq(e.target.value)
        props.restaurantActions.getRestaurant({query: e.target.value, page: search.page})
    }

    useEffect( () => {
        async function fetchData() {
            await props.restaurantActions.getRestaurant(search);
        }
        fetchData();
    }, [props.restaurantActions, search])   

    const deleteItem = item => {
        props.restaurantActions.deleteRestaurant(item.id)
    }

    const onChange = e => {
        const {value, name} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    console.log(props.restaurant)

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
    };

    const handleChange = (value) => {
        setKitchens(value)
    }
    const onChangePage = e => {
        setSearch(prev => ({
            ...prev,
            page: e
        }))
        props.restaurantActions.getRestaurant({query: search.query, page: e})
    }

    const handleUploadChange = info => {
        console.log(info)
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
                getBase64(info.file.originFileObj, imageUrl =>{
                    setLoading(false)
                    setImageUrl(imageUrl)
                    setImage(info.file.originFileObj)
                }
            );
        }
        };
    console.log(props.restaurant.total)

    const children = props.kitchens.map((item, i) => <Option value={item.id} key={i}>{item.name}</Option>)
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const data = props.restaurant?.restaurants?.map((item, i) => {
        return (
            <Col span={6}>
                <Meta id={item.id}/>
                <Card
                    hoverable
                    style={{ width: 240, margin: 20 }}
                    cover={<img alt="example" src={`http://localhost:5000/${item.image}`} />}
                >
                    <Meta title={`Название: ${item.name}`}/>
                    <Meta title={`Адресс: ${item.location}`}/>
                    <Meta title={`Средний чек: ${item.averageBill}`}/>
                    <Meta title={`Тел. номер: ${item.phone}`}/>
                    <Button onClick={showEditVisible} type="primary" style={{marginTop: 10}}>Редактировать</Button>
                    <Button onClick={() => deleteItem(item)} style={{marginTop: 10}}>Delete</Button>
                </Card>
            </Col>
        )
    }
)

return (
    <div>
    <Button type="primary" style={{display: "block", marginBottom: 10}} onClick={modalVisibleHandler}>Добавить ресторан</Button>
    <Input onChange={searchHandler} style={{marginBottom: 20}} placeholder="Введите название ресторана" />
        <Row gutter={20}>
            {data}
        </Row>
    <Pagination onChange={onChangePage} current={search.page} pageSize={6} total={Number(props.restaurant.total)}/>
        <Modal
            title="Create Restaurant"
            visible={modalVisible}
            onOk={okHandler}
            onCancel={() => setModalVisible(false)}
        >
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                // initialValues={{ size: componentSize }}
                // onValuesChange={onFormLayoutChange}
                // size={componentSize}
            >
                <Form.Item
                    label="Название ресторана"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите название ресторана!',
                        },
                    ]}
                >
                    <Input name="name"  onChange={onChange} />
                </Form.Item>
                <Form.Item
                    label="Адрес"
                    name="location"               
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите адрес ресторана!',
                        },
                    ]}
                >
                    <Input name="location"  onChange={onChange}/>
                </Form.Item>
                <Form.Item
                    label="Телефоный номер"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите телефонный номер ресторана!',
                        },
                    ]}
                >
                    <Input  name="phone" onChange={onChange}/>
                </Form.Item>
                <Form.Item
                    label="Количество мест"
                    name="amountOfPlace"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите вместимость ресторана!',
                        },
                    ]}
                >
                    <Input name="amountOfPlace" onChange={onChange}/>
                </Form.Item>
                <Form.Item
                    label="Средний чек"
                    name='averageBill'
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите средний чек ресторана!',
                        },
                    ]}
                >
                    <Input  name="averageBill" onChange={onChange}/>
                </Form.Item>
                <Form.Item
                    label="Кухня"
                    name="kitchens"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста выберите кухню ресторана!',
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Выберите кухню"
                        onChange={handleChange}
                    >
                        {children}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Рейтинг"
                    name='rate'
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите рейтинг ресторана!',
                        },
                    ]}
                >
                    <Input name="rate" onChange={onChange}/>
                </Form.Item>
                <Form.Item
                    label="Фото"
                    name="image"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста загрузите фото ресторана!',
                        },
                    ]}
                >
                        <Upload
                            customRequest={dummyRequest}
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleUploadChange}
                            >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                </Form.Item>
            </Form>
        </Modal>
                                        {/* Модалка для Редоктирования */}
                                        {/* Модалка для Редоктирования */}
        <Modal
            title="Edit Restaurant"
            visible={editModalVisible}
            onOk={handlerEdit}
            onCancel={() => setEditModalVisible(false)}
        >
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                // initialValues={{ size: componentSize }}
                // onValuesChange={onFormLayoutChange}
                // size={componentSize}
            >
                <Form.Item
                    label="Название ресторана"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите название ресторана!',
                        },
                    ]}
                >
                    <Input name="name"  onChange={onEditChange} />
                </Form.Item>
                <Form.Item
                    label="Адрес"
                    name="location"               
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите адрес ресторана!',
                        },
                    ]}
                >
                    <Input name="location"  onChange={onEditChange}/>
                </Form.Item>
                <Form.Item
                    label="Телефоный номер"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите телефонный номер ресторана!',
                        },
                    ]}
                >
                    <Input  name="phone" onChange={onEditChange}/>
                </Form.Item>
                <Form.Item
                    label="Количество мест"
                    name="amountOfPlace"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите вместимость ресторана!',
                        },
                    ]}
                >
                    <Input name="amountOfPlace" onChange={onEditChange}/>
                </Form.Item>
                <Form.Item
                    label="Средний чек"
                    name='averageBill'
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите средний чек ресторана!',
                        },
                    ]}
                >
                    <Input  name="averageBill" onChange={onEditChange}/>
                </Form.Item>
                <Form.Item
                    label="Кухня"
                    name="kitchens"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста выберите кухню ресторана!',
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Выберите кухню"
                        onChange={handleChange}
                    >
                        {children}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Рейтинг"
                    name='rate'
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите рейтинг ресторана!',
                        },
                    ]}
                >
                    <Input name="rate" onChange={onEditChange}/>
                </Form.Item>
                <Form.Item
                    label="Фото"
                    name="image"
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста загрузите фото ресторана!',
                        },
                    ]}
                >
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleUploadChange}
                            >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                </Form.Item>
            </Form>
        </Modal>
    </div>
    )
}

const mapStateToProps = state => ({
    error: state.restaurant.error,
    isLoading: state.kitchen.isLoading,
    kitchens: state.kitchen.kitchens,
    restaurant: state.restaurant.restaurants
})

const mapDispatchToProps = dispatch => ({
    restaurantActions: bindActionCreators(restaurantActions, dispatch),
    kitchensActions: bindActionCreators(kitchensActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps) (Restaurant);