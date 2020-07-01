import React from 'react';
import Card from 'react-bootstrap/Card';
import Cytoscape from "cytoscape";
import CytoscapeComponent from 'react-cytoscapejs';
import Header from './Header';
import axios from 'axios';
import klay from 'cytoscape-klay';
import COSEBilkent from "cytoscape-cose-bilkent";
import dagre from 'cytoscape-dagre';
Cytoscape.use(COSEBilkent);
// Cytoscape.use(klay);
// Cytoscape.use(dagre);
// Cytoscape.use(breadthfirst);

var node_style = require('../style/nodeStyle.json')
var edge_style = require('../style/edgeStyle.json')
var cyto_style = require('../style/cytoStyle.json')
var dataR1 = require('../resources/dataFlorist.json')

class GraphModuleFlorist extends React.Component {
  constructor(props){
    super(props);
    this.state = {text:null,
                  toBeDisp:'', 
                  global: 'Global DCR to project',
                  choreo:'Choreography Projection', 
                  r1:'Florist  Projection',
                  r2:'Driver Projection',
                  r3:'Customer Projection'
                };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {this.setState({toBeDisp: event.target.value});  }

  handleSubmit(event) {
    alert('Role projection to be displayed: ' + this.state.role);

    this.setState({role: this.state.toBeDisp});
    event.preventDefault();
  }
  
  componentDidMount() {

    axios.get(`http://localhost:5000/process`,     {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(res => {
      console.log(res);

    })
   }


  render(){
    const layout = cyto_style['layoutCose'];
    const style = cyto_style['style'];
    const stylesheet = node_style.concat(edge_style)

    return  <div>
             <Header/>

              <Card id="r1" style={{width: '95%', height:'90%','margin-top':'3vh'}}>
              <Card.Header as="p" style= {{color:'white', 'background-color': '#006588', 'font-size': '10pt', 'font-weight': 200, padding: '2ex 1ex'}}>
                  {this.state.r1}</Card.Header>
                <Card.Body >
                  <CytoscapeComponent elements={dataR1} 
                                        stylesheet={stylesheet} 
                                        layout={layout} 
                                        style={style} />    
                </Card.Body>
              </Card>

              <Card id="exec_r1" style={{width: '95%', height:'70%','margin-top':'3vh'}}>
              <Card.Header as="p" style= {{color:'white', 'background-color': '#006588', 'font-size': '10pt', 'font-weight': 200, padding: '2ex 1ex'}}>
                  Execution logs</Card.Header>
                <Card.Body >
                </Card.Body>
              </Card>
{/* 
              <Card id="r2" style={{width: '95%', height:'70%'}}>
              <Card.Header as="p" style= {{color:'white', 'background-color': '#006588', 'font-size': '10pt', 'font-weight': 200, padding: '2ex 1ex'}}>
                {this.state.r2}</Card.Header>
                <Card.Body >
                  <CytoscapeComponent elements={dataR2} 
                                        stylesheet={stylesheet} 
                                        layout={layout} 
                                        style={style} />    
                </Card.Body>
              </Card>

              <Card id="r3" style={{width: '95%', height:'70%','margin-bottom':'3vh'}}>
              <Card.Header as="p" style= {{color:'white', 'background-color': '#006588', 'font-size': '10pt', 'font-weight': 200, padding: '2ex 1ex'}}>
                {this.state.r3}</Card.Header>
                <Card.Body >
                  <CytoscapeComponent elements={dataR3} 
                                        stylesheet={stylesheet} 
                                        layout={layout} 
                                        style={style} />    
                </Card.Body>
              </Card>*/}
            </div>; 
  }
}

export default GraphModuleFlorist