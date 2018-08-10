import React, { Component } from 'react'
import { Button, Card, Image, Form, Checkbox } from 'semantic-ui-react'
import Axios from 'axios';

export default class Form1 extends Component {

    //Buat state untuk menampung data yang diambil dari database 
    state = {
        data: [],
        title: '',
        desc: ''
    }


    // START OFFUNCTION GETDATA
    //Fungsi getData untuk mengambil data pada server 
    getData = () => {
        Axios
            .get('http://localhost:8000/api/data/') //Diambil dari server nedb kita
            .then(res => {

                //Menampung data yang diambil dari database ke state data
                this.setState({
                    data: res.data
                })
            })
    }
    // END OF FUNCTION GET DATA

    //Membuat Fungsi Post
    postData = () => {
        Axios
            .post('http://localhost:8000/api/data/', {
                "title": this.state.title,
                "desc": this.state.desc
            })
            .then(res => {
                this.setState({
                    title: '',
                    desc: ''
                })
                this.getData();
            })

    }

    //Buat fungsi delete database
    deleteData = (_id) => {
        Axios
            .delete(`http://localhost:8000/api/data/${_id}`)
            .then(res => {
                this.getData()
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value

        })
    }

    //Menjalankan fungsi getData
    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Field>
                        <label>First Name</label>
                        <input
                            name="title"
                            onChange={this.handleChange}
                            value={this.state.title}
                            placeholder='title' />
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <input
                            name='desc'
                            onChange={this.handleChange}
                            value={this.state.desc}
                            placeholder='description' />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <Button
                        onClick={() => { this.postData() }}
                        type='submit'>Submit</Button>
                </Form>

                {this.state.data.map(datum => {
                    return (
                        <Card>
                            <Card.Content>
                                <Image floated='right' size='mini' src='/images/avatar/large/steve.jpg' />
                                <Card.Header>{datum.title}</Card.Header>
                                <Card.Description>
                                    {datum.desc}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button basic color='green'>
                                        Edit
                            </Button>
                                    <Button
                                        onClick={() => { this.deleteData(datum._id) }}
                                        basic color='red'>
                                        Delete
                            </Button>
                                </div>
                            </Card.Content>
                        </Card>
                    )
                })}

            </div>
        )
    }
}
