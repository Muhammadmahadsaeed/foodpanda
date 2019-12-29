import React from 'react'
import { Tag } from 'antd';
import * as firebase from "firebase/app";
import "firebase/auth";

const { CheckableTag } = Tag;

const tagsFromServer = ['BBQ', 'Chinese', 'Fast Food', 'Chips'];

export default class HotTags extends React.Component {
  state = {
    selectedTags: [],
  };
  // componentDidMount(){
  //   this.fetchData()
  // }
  // fetchData () {

  //   firebase.firestore().collection('resturant').get()
  //   .then((snapshot) => {
  //     let data = []
  //     snapshot.forEach((resturantData) => {
  //       const res = resturantData.data()
  //       // console.log("agya==========>",res)
        
  //       data.push({res })
        
  //     })
  //     this.setState({selectedTags:data})
  //   })
  // };
  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags } = this.state;
    // console.log("nhi aya==========>",{...selectedTags})
    return (
      <div>
        <h6 style={{ marginRight: 8, display: 'inline' }}>Categories:</h6>
        {tagsFromServer.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    );
  }
}

