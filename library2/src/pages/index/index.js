import React, { useState, useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Context } from '../../Context'
export default function Index() {

  const {state ,dispatch} = useContext(Context);


console.log(state);
console.log(dispatch)


 
  async function  getData(){
    const res = await fetch(`${state.host}/library/room`, {method: 'get'});
    const result = await res.json();
   
    dispatch({
      type:'setArrange',
      value:result
    })
   
  }


  return (

    <Container style={{ background: ' rgb(240,238,245)' }}>
      <Row style={{ height: '600px' }}>
        <Col md={3} >
          <Navbar bg="success" variant="dark" className="flex-column " >
            <Navbar.Brand href="#home" style={{ height: '200px' }}>管理员</Navbar.Brand>
            <Nav justify className="mr-auto" className="flex-column" style={{ height: '380px' }}>
              <Nav.Link href="#home">首页</Nav.Link>
              <Nav.Link href="#features">统计</Nav.Link>
              <Nav.Link href="#pricing">设置</Nav.Link>
            </Nav>

          </Navbar>

        </Col>
        <Col md={8} >
          <Row style={{ height: '100px' }}>
            <Col md={12} className='text-center text-success '><h1>欢迎使用</h1></Col>
          </Row>
          <Row style={{ height: '440px' }}>
            <Col md={12} className='border border-success rounded bg-white' style={{ overflow: 'auto ' }}>
              {/* 房间 */}
              <Row>
                {
                  state.arrange && state.arrange.map((item, index) =>
                    <Card key={index} border="secondary" style={{ width: '18rem' }} className='text-center m-4'>
                      <Card.Header>{item.roomId}号房间</Card.Header>


                      <Card.Body><Card.Title>{item.neat && item.place ? '已整理' : item.neat ? '有错位' : '未整理'}</Card.Title><Card.Text>
                        <Link to={'/neat/' + item.roomId} className={item.arrange && 'invisible'} > <Button variant="outline-success">进入</Button></Link>
                      </Card.Text>
                      </Card.Body>
                    </Card>
                  )}

              </Row>
              {/* 房间 */}
            </Col>
          </Row>
          <Row style={{ height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Button variant="success" onClick={ getData} >查看房间</Button></Row>
        </Col>
        <Col md={1} ></Col>
      </Row>



    </Container>
  );
}


