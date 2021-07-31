import React from 'react';
import { Card, Button, Col, Row, Container, ListGroup } from 'react-bootstrap';

let stockSymbol = 'BA';

class Stock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dateValues: [],
            closeValues: []
        }
    }

    componentDidMount() {
        this.fetchStock();
    }

    fetchStock() {

        const pointerToThis = this;
        console.log(pointerToThis);
        const API_KEY = 'ABJFHOMFBUCCIJYO';

        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=1min&outputsize=full&apikey=${API_KEY}`;
        let dates = [];
        let closes = [];

        fetch(API_Call)
            .then(function (response) {
                return response.json();
            })
            .then(
                function (data) {
                    console.log(data);
                    for (var key in data['Time Series (1min)']) {
                        dates.push(key);
                        closes.push(data['Time Series (1min)'][key]['4. close']);
                    }
                    pointerToThis.setState({
                        dateValues: dates,
                        closeValues: closes
                    });
                }
            )
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Card>
                        <Row>
                            <h1>Stock prices in the last 10 minutes</h1>
                            <h3>Stock Symbol:                             <Button variant="primary">{stockSymbol}</Button></h3>

                        </Row>
                    </Card>
                    <Card>
                        <Row>
                            <Col>
                                <ListGroup>
                                    {this.state.dateValues.slice(0, 10).map((dateValue, index) => {
                                        return <ListGroup.Item key={index}>{dateValue}</ListGroup.Item>
                                    })}
                                </ListGroup>
                            </Col>
                            <Col>
                                <ListGroup>
                                    {this.state.closeValues.slice(0, 10).map((closeValue, index) => {
                                        return <ListGroup.Item key={index}>{closeValue}</ListGroup.Item>
                                    })}
                                </ListGroup>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default Stock;