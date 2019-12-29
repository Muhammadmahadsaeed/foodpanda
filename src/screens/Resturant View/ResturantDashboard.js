import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
// import ResturantView from './Resturant-view'
import ResturantAllRequests  from './AllRequests';
import { connect } from 'react-redux'
import ResturantNavbar from './navbar';
import Pending from './pending'
class ResturantDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    console.log(this.props.userLoginData)
    return (
      <div>
        <ResturantNavbar {...this.props}/>
        <div style={{paddingTop:'2%'}}>
        <Nav tabs>
        <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              All Requests
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              In Progress
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Pending
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Delivered
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {/* <Row>
              <Col sm="12">
                <h4>Tab 1 Contents</h4>
              </Col>
            </Row> */}
            <ResturantAllRequests {...this.props}/>
          </TabPane>
          <TabPane tabId="2">
            
            <Pending {...this.props}/>
          </TabPane>
          <TabPane tabId="3">
            
            {/* <UserRequests /> */}
          </TabPane>
        </TabContent>
      </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
      // user: state.user
      userLoginData: state.mainReducer.userLoginData,

  }
}
export default connect(mapStateToProps, null)(ResturantDashboard)