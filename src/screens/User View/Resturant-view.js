import { List, message, Avatar, Spin,Button } from 'antd';
import reqwest from 'reqwest';
import React from 'react';
import { Input } from 'antd';
import * as firebase from "firebase/app";
import "firebase/auth";
import InfiniteScroll from 'react-infinite-scroller';
import HotTags from './Categories';
import DetailScreen from './DetailScreen'


const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class ResturantView extends React.Component {
  constructor(props){
    super()
    this.state = {
      data: [],
      loading: false,
      hasMore: true,
      result : '',
      text : ''
    };
    
  this.search = this.search.bind(this)
    
  }
  

  componentDidMount() {
    this.fetchData()
  }

  fetchData () {
   
    firebase.firestore().collection('resturant').get()
    .then((snapshot) => {
      let data = []
      snapshot.forEach((resturantData) => {
        const res = resturantData.data()
        
        data.push({content:res })
        // console.log(data)
        
      })
      this.setState({data:data})
    })
    
  };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      loading: true,
    });
    if (data.length > 5) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    
      data = data.concat(data);
      this.setState({
        data,
        loading: false,
      
    });
  };
detailScreen(e){
  console.log(e)
  this.props.history.push('/DetailScreen',{id:e.content.resid})
}
search(e){
  console.log()
  let text = e.target.value
  // text = text.charAt(0).toUpperCase()+text.slice(1)
  const {data} = this.state;
  // console.log(data)
  const result = data.filter((items)=>{
    console.log(items.content.resturantName)
      return items.content.resturantName.substr(0,text.length) === text
                  
  })
  this.setState({result,text})
  // console.log(result)
}
render() {
  console.log("resturant View===========>",this.state.data)
    const { Search } = Input;
    const {data,result,text} = this.state
    
    // console.log(forces)
    const arr = text.length ? result : data
    return (
      <div className="demo-infinite-container container">
         <br/>
         <Search
          placeholder="Type Resturant Name here......"
          onChange={this.search}
          style={{ width: '100%'}}
          />
          <br/><br/>
        <HotTags />
        <br />
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            dataSource={arr}
            renderItem={item => (
              <List.Item key={item.id}>
          
                 
                <List.Item.Meta key={item.id}
                     
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href="#">{item.content.resturantName.charAt(0).toUpperCase()+item.content.resturantName.slice(1)}</a>}
                  
                  description={
                          <Button style={{float:'right'}} onClick={()=>this.detailScreen(item)} type="primary" ghost >
                              {item.content.foods.foodItems}
                          </Button>
                  }
                />
                
               

           </List.Item>
            )}
          > 
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}

// ReactDOM.render(<InfiniteListExample />, mountNode);
export default ResturantView