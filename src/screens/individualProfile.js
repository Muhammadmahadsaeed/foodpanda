import React from 'react'

class IndividualProfile extends React.Component{
    render(){
        return(
            <div>
                <h1>{this.props.match.params.username}</h1>
            </div>
        )
    }
}