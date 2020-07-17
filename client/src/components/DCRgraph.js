import React from 'react';
import Card from 'react-bootstrap/Card';
import Cytoscape from "cytoscape";
import CytoscapeComponent from 'react-cytoscapejs';
import axios from 'axios';
import ExecLogger from './execLogger';
import COSEBilkent from "cytoscape-cose-bilkent";
import DCRpublicEngine from "../contracts/DCRpublicEngine.json";
import getWeb3 from "../getWeb3";

Cytoscape.use(COSEBilkent);
var node_style = require('../style/nodeStyle.json')
var edge_style = require('../style/edgeStyle.json')
var cyto_style = require('../style/cytoStyle.json')

var vectChoreo = require('../projections/vectChoreo.json')

class DCRgraph extends React.Component {
  constructor(props){
    super(props);
    this.state = {text:null,
                  toBeDisp:'', 
                  global: 'Global DCR to project',
                  choreo:'Choreography Projection', 
                  r1:'Florist  Projection',
                  r2:'Driver Projection',
                  r3:'Customer Projection',
                  idClicked:'',
                  DCRPublicId:'',
                  nameClicked:'',
                  web3: null,
                  accounts: null,
                  contract: null, 
                  execStatus:'',
                  bcRes:''
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
  
  componentDidMount = async () => {
      this.cy.fit();

      try {  
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
  
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
  
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = DCRpublicEngine.networks[networkId];
   
        const instance = new web3.eth.Contract(
          DCRpublicEngine.abi,
          deployedNetwork && deployedNetwork.address,
        );  
        this.setState({ web3, accounts, contract: instance });
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      };
  
      this.setUpListeners();
  
    };
  
    runBCCheck = async () => {
      const {accounts, contract} = this.state;

      const activityNames = vectChoreo['activityNames'];
      const isElem = (element) => element == this.state.idClicked;
      this.setState({DCRPublicId:activityNames.findIndex(isElem)});

      try {
        web3.eth.handleRevert = true;
        console.log(this.state.DCRPublicId);
        const bcStatus = await contract.methods.execute(
          this.state.web3.utils.fromAscii("test"),  //workflowID
          this.state.DCRPublicId                    //activityID
          ).send({ from: accounts[0]})
       .on('error', (err, receipt) => {
          console.log("err.message =",err.message);
          console.log("receipt =", receipt);
        });

        this.setState({bcRes:bcStatus})

        } catch (err) {
              console.log("web3.eth.handleRevert =", web3.eth.handleRevert)
              console.error(err);
              console.log("err.message =",err.message);
              this.setState({bcRes:'BC exec - rejected'})
        }
  }

   setUpListeners = () => {
    this.cy.on('click', 'node', (event) => {
 
      //getClikedNode
      console.log(event.target['_private']['data']);
      this.setState({nameClicked:event.target['_private']['data']['name']});
      this.setState({idClicked:event.target['_private']['data']['id']});
    
      //updateGraphMarkings
      event.preventDefault()
      const idClicked = this.state.idClicked;
      var headers = {
        "Access-Control-Allow-Origin": "*",
      };
      axios.post(`http://localhost:5000/process`, 
        {idClicked, projId:this.props.id},
        {"headers" : headers}
      ).then( 
        (response) => { 
            var result = response.data; 

            if (result.includes('BC')){
              window.alert('Public task to be checked on the blockchain');  
              //check BC execution
              this.runBCCheck();

              //update graph markings
              var execStatus = this.state.bcRes;
              axios.post(`http://localhost:5000/BCupdate`, 
                {idClicked, projId:this.props.id, execStatus},
                {"headers" : headers}
              );      
            }
        }, 
        (error) => { 
            console.log(error); 
        } 
    ); 

    })

  
    }

  render(){
    // const layout = cyto_style['layoutCose'];
    const style = cyto_style['style'];
    const stylesheet = node_style.concat(edge_style)

    return  <div>
              <Card style={{width: '95%', height:'90%','marginTop':'3vh'}}>
              <Card.Header as="p" style= {{color:'white', 'backgroundColor': '#006588', 'fontSize': '10pt', 'fontWeight': 200, padding: '2ex 1ex'}}>
                  {this.props.id}</Card.Header>
                <Card.Body >
                  <CytoscapeComponent elements={this.props.data} 
                                        stylesheet={stylesheet} 
//                                      layout={layout} 
                                        style={style} 
                                        cy={(cy) => {this.cy = cy}}
                                        boxSelectionEnabled={false}
                                        />    
                </Card.Body>
              </Card>
              <ExecLogger  execLogs = {this.props.execLogs}/>
            </div>; 
  }
}

export default DCRgraph
