import React, { Component } from 'react';

export default class SearchBar extends Component {

    state = {
        search: '#machinelearning'
    }

    render() {
        return (
            <div className='col-md-4 offset-md-4'>
                <form onSubmit={(event) => {this.props.submitHandler(event, this.state.search)}}>
                    <div className='input-group'>
                        <input type='text' className='form-control' onChange={(e) => {this.setState({search: e.target.value})}} value={this.state.search}/>
                        <div className='input-group-append'>
                            <input type='submit' value='Analyse' className='btn btn-outline-dark' disabled={this.state.search.length < 2}/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}