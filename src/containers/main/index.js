import React from 'react';
import Navbar from '../../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css'
import { Carousel, Container, Card, CardDeck } from 'react-bootstrap';
import Footer from '../../components/footer'

function Main() {

   return (
      <div className="wrapper">
         <Navbar />
         <div className="carousel-wrapper">
            <div className="auth-wrapper">
               <div className="auth">
                  <h3>Welcome to </h3>
                  <h2>RESTAURANT</h2>
                  <a href={`/signin`} className="sign-in active">Sign In</a>
                  <a href={`/signup`} className="sign-up">Sign Up</a>
               </div>
            </div>
            <Carousel>
               <Carousel.Item interval={2500}>
                  <img
                     className="d-block w-100"
                     src="https://i.pinimg.com/originals/65/ea/b7/65eab7350ddfb2cf1a4d39a45951dacd.jpg"
                     alt="First slide"
                     style={{ height: `100vh` }}
                  />
               </Carousel.Item>
               <Carousel.Item interval={2500}>
                  <img
                     className="d-block w-100"
                     src="https://www.luxuriousmagazine.com/wp-content/uploads/2016/05/German-Gymnasium-3.jpg"
                     alt="Third slide"
                     style={{ height: `100vh` }}
                  />
               </Carousel.Item>
               <Carousel.Item interval={2500}>
                  <img
                     className="d-block w-100"
                     src="https://i.pinimg.com/originals/9e/d2/1b/9ed21bd34a1e99077e435edc6bf62c6b.jpg"
                     alt="Third slide"
                     style={{ height: `100vh` }}
                  />
               </Carousel.Item>
            </Carousel>
         </div>
         <div className="blog-wrapper">
            <Container>
               <div className="restaurant-blog">
                  <div className="inner">
                     <h3>our restaurants</h3>
                     
                  </div>
               </div>
            </Container>
         </div>
         <div className="section">
            <div className="cards-blog">
               <div className="section-inner">
                  <h3>sweets and desserts</h3>
               </div>
               <div className="cards">
                  <CardDeck>
                     <Card>
                        <Card.Img variant="top" className="card_size"
                        src="https://img1.goodfon.com/original/2362x1772/a/cd/torty-klubnika-malina-mindal.jpg" />
                        <Card.Body>
                           <Card.Title>Card title</Card.Title>
                           <Card.Text>
                              This is a wider card with supporting text below as a natural lead-in to
                              additional content. This content is a little bit longer.
                           </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                           <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                     </Card>
                     <Card>
                        <Card.Img variant="top" className="card_size"
                        src="https://img1.goodfon.com/original/5160x3486/8/f2/berries-cake-sweet-dessert-2889.jpg" />
                        <Card.Body>
                           <Card.Title>Card title</Card.Title>
                           <Card.Text>
                              This card has supporting text below as a natural lead-in to additional
                              content.
                           </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                           <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                     </Card>
                     <Card>
                        <Card.Img variant="top" className="card_size"
                        src="https://www.wholesalesuppliesplus.com/Images/Products/9494-Sweet-on-Paris-Fragrance-Oil-579.jpg" />
                        <Card.Body>
                           <Card.Title>Card title</Card.Title>
                           <Card.Text>
                              This is a wider card with supporting text below as a natural lead-in to
                              additional content. This card has even longer content than the first to
                              show that equal height action.
                           </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                           <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                     </Card>
                  </CardDeck>
               </div>
            </div>
         </div>
         <Footer />
      </div>
   )
}
export default Main
