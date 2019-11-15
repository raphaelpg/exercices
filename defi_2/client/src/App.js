import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './logo.svg';
import './App.css';
import defi2 from './contracts/defi2.json';
import illustrator from './images/illustrator.jpg';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: null,
      account: '',
      defi2: '',
      loading: true
    }
    //this.passerArtiste = this.passerArtiste.bind(this);
  }

  async componentWillMount() {
    await this.loadWeb3()    
    await this.loadBlockchainData()  
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({
      account: accounts[0],
      web3: web3
    })

    const networkId = await web3.eth.net.getId()
    const networkData = defi2.networks[networkId]

    /*if(networkData) {      
      const defi2 = new web3.eth.Contract(defi2.abi, networkData.address)
      //const tour = await defi2.methods.getTour().call()
      //const artisteActuel = await defi2.methods.artisteEncours().call()
      this.setState({
        defi2 : defi2._address//,
        //tour,
        //artisteActuel
      })
    } else {
      window.alert('defi2 contract not deployed to detected network.')
    }*/
  }

  /*async ajouterArtiste(nomArtiste) {
    const { web3, defi2, account } = this.state
    const contract = new web3.eth.Contract(defi2.abi, defi2)

    await contract.methods.sInscrire(nomArtiste).send({from: account})
  }*/

  async ajouterEntreprise(nomEntreprise) {
    const { web3, defi2, account } = this.state;
    const contract = new web3.eth.Contract(defi2.abi, defi2);
 
    await contract.methods.inscrireEntreprise(nomEntreprise).send({from: account});
  }

  /*async passerArtiste() {
    const { web3, defi2, account } = this.state;
    const contract = new web3.eth.Contract(defi2.abi, defi2);

    await contract.methods.passerArtisteSuivant().send({from: account});
    // update state    
    const tour = await contract.methods.getTour().call();
    const artisteActuel = await contract.methods.artisteEncours().call();
    this.setState({
      tour,
      artisteActuel
    });
  }*/

  render() {
    const { artisteActuel, tour } = this.state
    return (
      <div className="App">
        <div className="App-header">
        <img id="image" src={illustrator} alt="image of someone drawing" />
        <h2>Illustrator Market Place</h2>
          <div className="row">
            <h3>Inscrire entreprise</h3>
            <form onSubmit={(event) => {
              event.preventDefault()
              const entreprise = this.nomEntreprise.value
              this.ajouterEntreprise(entreprise)
            }}>
            <div className="form-group mr-sm-2">
              <input
                id="nomEntreprise"
                type="text"
                ref={(input) => { this.nomEntreprise = input }}
                className="form-control"
                placeholder="Nom de l'entreprise"
              required /> 
            </div>
            <button type="submit" className="btn btn-primary">Ajouter</button>
            </form>
          </div>
          <div className="row">
            <h3>Liste des offres:</h3>
            {/*<button  onClick={ this.passerArtiste } className="btn btn-primary"> > > </button>*/}
            <label id="tour">Le tour actuel est à {tour}</label><br></br>
            <label id="artisteActuel">Artiste actuel est {artisteActuel}</label>
          </div>
        </div>
      </div>
    );
  }
}

export default App;