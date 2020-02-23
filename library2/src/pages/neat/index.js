import React, { useState, useEffect,useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './neat.css';
import { Link } from 'react-router-dom';
import robot from './robot.png';
import { Context } from '../../Context';
export default function Index(props) {
    const [reCheck, setReCheck] = useState(0);  //重新检测

 
    const [roomId, setRoomId] = useState(props.match.params.id);

    const {state ,dispatch} = useContext(Context);



    useEffect(() => {

        getRobot();

    }, [])

    async function getRobot() {
        const res = await fetch(`${state.host}/library/robot`, { method: 'get' });
        const result = await res.json();

        dispatch({
            type:'robot',
            value:result.robot
        })
    }

    async function getBookshelfNeat() {
        const res = await fetch(`${state.host}/library/neat`, { method: 'get' });
        const result = await res.json();

        dispatch({
            type:"allNeat",
            value:result.allNeat
        });
        
        dispatch({
            type:"noNeatList",
            value:result.noNeat
        })
        setReCheck(1);
    }

    return (
        <Container className='bg-light'>
            <Row style={{ height: '100px' }}>
                <Col md={2}></Col>
                <Col md={8} className='text-center text-success '><h1>阶段1:图书摆正({roomId}号房间)</h1></Col>
                <Col md={2}></Col>

            </Row>
            <Row style={{ height: '400px' }}>
                <Col md={2} className='goto'> <Link to='' style={{ textDecoration: 'none' }}> <div className='go bg-success' > &lt; </div></Link> </Col>
                <Col md={8} className='border border-success rounded bg-white' style={{ overflow: 'auto ' }}>
                    {/* 书架 */}
                    {state.allNeat ? '已摆正' : <Row>
                        {state.noNeatList&&state.noNeatList.map((item,index)=>
                        <div key={index} className='bookshefl-box m-4'>
                            <Link to={`/neat/${item.bookshelfId}/bookshelf/${index+1}`}>
                                <div className='bookshelf'  >
                                    {item.noNeat?<div className="nmask"></div>:<div></div>} 
                                </div></Link>
                            <div className='text-center'>{item.bookshelfId}号书架</div>
                        </div>)
}
                    </Row>}

                    {/* 书架 */}
                </Col>
<Col md={2} className='goto'>{
// state.allNeat &&
<Link to={`/place/${roomId}`} style={{ textDecoration: 'none' }}> <div className='go bg-success' > &gt; </div></Link>} </Col>
            </Row>
            <Row style={{ height: '100px' }}>
                <Col md={2}></Col>
                <Col md={8} className=' text-center mt-3'>
                    {state.robotState ? !state.allNeat&& (reCheck ? <Button variant="warning"  onClick={getBookshelfNeat}>重新检测</Button> : <Button variant="success" onClick={getBookshelfNeat} >开始检测</Button>) : <Button variant="success" onClick={getRobot} >查找机器人</Button>}
                </Col>
                {state.robotState ? (<Col md={2}><img className='bg-success border rounded' style={{ height: '80%' }} src={robot} alt="" /><h6>机器已就绪</h6></Col>) : (<Col md={2}><img className='bg-danger border rounded' style={{ height: '80%' }} src={robot} alt="" /><h6>机器未就绪</h6></Col>)
                }
            </Row>
        </Container>
    );
}