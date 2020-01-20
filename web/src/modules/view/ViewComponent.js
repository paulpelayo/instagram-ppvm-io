import React from 'react';
import {
  Col,
  Row,
} from 'react-bootstrap/';

class ViewComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    }
  }
  componentDidMount() {
    console.log('hello world')
    fetch("https://s3.amazonaws.com/instagram.ppvm.io/data/images.json") 
      .then(res => res.json())
      .then(
        (res) => {
          console.log(res)
          this.setState ({
            data: res[0].images
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const data = this.state.data
    var renderedOutput = data.map(item => 
      <div> 
        <img src={item}/>
      </div>)

    renderedOutput = <div>
      <Row>
        <Col md={4}>md=4</Col>
        <Col md={{ span: 4, offset: 4 }}>{`md={{ span: 4, offset: 4 }}`}</Col>
      </Row>
      <Row>
        <Col md={{ span: 3, offset: 3 }}>{`md={{ span: 3, offset: 3 }}`}</Col>
        <Col md={{ span: 3, offset: 3 }}>{`md={{ span: 3, offset: 3 }}`}</Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>{`md={{ span: 6, offset: 3 }}`}</Col>
      </Row>
    </div>

    return (
      <div>
        {renderedOutput}
      </div>
    );
  }
}

export default ViewComponent;
