import React, { useState, useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Nbookshelf.css';
import { Context } from '../../Context';
export default function Index(props) {


    const { state, dispatch } = useContext(Context);
    const [noNeat, setNoNeat] = useState();


    const roomId = props.match.params.nid;
    const bookshelfId = props.match.params.nbsid;

    useEffect(() => {
        getRowData();

    },[])

    async function getRowData() {
        const res = await fetch(`${state.host}/library/neat/${roomId}/bookshelf/${bookshelfId}`, { method: 'get' });
        const result = await res.json();

        setNoNeat(result.row);

    }


 function neatOK(){


    window.history.back()

 }


    return (
        <Container className='bg-light'>
            <Row style={{ height: '100px' }}>
                <Col md={2}></Col>
                <Col md={8} className='text-center text-success '><h1>{bookshelfId}号书架(摆正)</h1></Col>
                <Col md={2}></Col>

            </Row>
            <Row style={{ height: '400px' }}>
                <Col md={2}></Col>
                <Col md={8} className='border border-success rounded bg-white' style={{ overflow: 'auto ' }}>
                    {/* 书层 */}
                    <div className='bs'>
                        {
                            noNeat && noNeat.map((item, idx) =>
                                <div className="bs-row">
                                    {item.hasOwnProperty('error') ? item.error.map(
                                        (item, index) => (<div key={index} className='mask' style={{ width: (item[1] - item[0]) * 3 + 'px', left: item[0] * 3 + 'px' }} > </div>)
                                    ) : <div></div>

                                    }
                                </div>
                            )

                        }

                    </div>
                    {/* 书层 */}
                </Col>
                <Col md={2}></Col>
            </Row>
            <Row style={{ height: '100px' }}>
                <Col md={2}></Col>
                <Col md={8} className=' text-center mt-3'> <Button variant="success" onClick={neatOK}>完成摆正</Button></Col>
                <Col md={2}></Col>
            </Row>
        </Container>
    );
}