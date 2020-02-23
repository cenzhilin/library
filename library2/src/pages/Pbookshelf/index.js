import React ,{ useState,useEffect,useContext }from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Pbookshelf.css';
import { Context } from '../../Context';

export default function Index(props) {
    const { state, dispatch } = useContext(Context);

    const [morebook,setMorebook]=useState();

    const roomId = props.match.params.pid;
    const bookshelfId = props.match.params.pbsid;

    useEffect(() => {
        getRowData();

    },[])

    async function getRowData() {
        const res = await fetch(`${state.host}/library/place/${roomId}/bookshelf/${bookshelfId}`, { method: 'get' });
        const result = await res.json();

        setMorebook(result.row);
        
        
    }

    return (
        <Container className='bg-light'>
            <Row style={{ height: '100px' }}>
                <Col md={2}></Col>
                <Col md={8}  className='text-center text-success '><h1>一号书架</h1></Col>
                <Col md={2}></Col>

            </Row>
            <Row style={{ height: '400px' }}>
                <Col md={2}></Col>
                <Col md={8} className='border border-success rounded bg-white' style={{overflow:'auto '}}>
{/* 书层 */}
<div className='bs'>

    
   {morebook&&morebook.map((item,index)=>
   <div key={index} className="bs-row">
   <ul className='bul'>
  {item.map((item,index)=>
       <li key ={index} className={item.state?"book":" book bg-danger"}> {item.name.slice(0,4)}...
     </li>
   )} 

</ul>
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
                <Col md={8} className=' text-center mt-3'> <Button variant="success" onClick={()=>window.history.back() }>完成</Button></Col>
                <Col md={2}></Col>
            </Row>
        </Container>
    );
}