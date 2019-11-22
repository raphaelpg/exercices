import Web3 from 'web3';
import Defi2 from './contracts/Defi2.json';
import React, {Component } from 'react';
import './App.css';
import DappHeader from './components/dappHeader';

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      web3: null,
      account: '',
      contrat: '',
      loading: true,
      nombreDemandes: 0,
      demande: '',
      offers: []
    }
  }

  async componentWillMount() {
    await this.loadWeb3()
    console.log("loadWeb3 OK")  
    await this.loadBlockchainData()
    console.log("loadBlockchainData OK")
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
    const networkData = Defi2.networks[networkId]

    if(networkData) {      
      const contrat = new web3.eth.Contract(Defi2.abi, networkData.address)
      this.setState({
        contrat : contrat._address
      })
      console.log(contrat)
    } else {
      window.alert('Defi2 contract not deployed to detected network.')
    }
  }

  //Inscription utilisateur
  async inscription(name){
    console.log("etape 1")
    const { web3, contrat, account } = this.state
    console.log("etape 2")
    const myContract = new web3.eth.Contract(Defi2.abi, contrat)
    console.log("etape 3")
    console.log(name)
    await myContract.methods.inscription(name).send({from: account})
    console.log("inscription envoyée")
  }

  //ajouterDemande(uint remuneration, uint delai, string memory description, uint reputationMini)
  async ajouterDemande(remuneration, delai, description, reputationMini) {
    const { web3, contractAddress} = this.state;
    const myContract = new web3.eth.Contract(Defi2.abi, contractAddress);
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]});
    const { account } = this.state;

    await myContract.methods.ajouterDemande(remuneration, delai, description, reputationMini).send({from: account});
    console.log("Demande ajoutée ");
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <DappHeader />
          <main>
            <div className="conteneur">
              Inscription:
              <form className="inscriptionFormulaire" onSubmit={(event) => {
                  event.preventDefault()
                  const nom = this.nomUtilisateur.value
                  this.inscription(nom)
                }}>
                <div className="champs">
                  <div className="formulaireItems">Nom: 
                  <input id="nomUtilisateur" type="text" ref={(input) => { this.nomUtilisateur = input }} required/>
                  </div>
                </div>
                <button type="submit" >Valider</button>
              </form>
            </div>

            <div className="conteneur">
            Liste des offres:
            <ul>
              { this.state.offers.map( offre => <li>{ offre }</li>)}
            </ul>
            </div>

            <div className="conteneur">
              <form className="formulaire" onSubmit={(event) => {
                  event.preventDefault()
                  this.ajouterDemande();
                }}>Proposer une offre:
                  <div className="champs">
                    <div className="formulaireItems">Remuneration: 
                    <input />
                    </div>
                    <div className="formulaireItems">Delai: 
                    <input />
                    </div>
                    <div className="formulaireItems">Description: 
                    <input />
                    </div>
                    <div className="formulaireItems">Réputation minimum: 
                    <input />
                    </div>
                  </div>
                <button type="submit" >Ajouter demande</button>
              </form>
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default App;


/*
import React, { Component } from 'react';
import Web3 from 'web3';
import logo from './logo.svg';
import './App.css';
import SceneOuverte from './contracts/SceneOuverte.json';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: null,
      account: '',
      sceneOuverte: '',
      tour: '',
      artisteActuel: '',
      loading: true
    }
    this.passerArtiste = this.passerArtiste.bind(this);
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
    const networkData = SceneOuverte.networks[networkId]

    if(networkData) {      
      const sceneOuverte = new web3.eth.Contract(SceneOuverte.abi, networkData.address)
      const tour = await sceneOuverte.methods.getTour().call()
      const artisteActuel = await sceneOuverte.methods.artisteEncours().call()
      this.setState({
        sceneOuverte : sceneOuverte._address,
        tour,
        artisteActuel
      })
    } else {
      window.alert('SceneOuverte contract not deployed to detected network.')
    }
  }

  async ajouterArtiste(nomArtiste) {
    const { web3, sceneOuverte, account } = this.state
    const contract = new web3.eth.Contract(SceneOuverte.abi, sceneOuverte)

    await contract.methods.sInscrire(nomArtiste).send({from: account})
  }

  async passerArtiste() {
    const { web3, sceneOuverte, account } = this.state;
    const contract = new web3.eth.Contract(SceneOuverte.abi, sceneOuverte);

    await contract.methods.passerArtisteSuivant().send({from: account});
    // update state    
    const tour = await contract.methods.getTour().call();
    const artisteActuel = await contract.methods.artisteEncours().call();
    this.setState({
      tour,
      artisteActuel
    });
  }

  render() {
    const { artisteActuel, tour } = this.state
    return (
      <div className="App">
        <div className="App-header">
        <h2>Interaction avec Scene Ouverte</h2>
          <div className="row">
            <h3>Ajout Artiste</h3>
            <form onSubmit={(event) => {
              event.preventDefault()
              const name = this.nomArtiste.value
              this.ajouterArtiste(name)
            }}>
            <div className="form-group mr-sm-2">
              <input
                id="nomArtiste"
                type="text"
                ref={(input) => { this.nomArtiste = input }}
                className="form-control"
                placeholder="Nom de l'artiste"
              required />
            </div>
            <button type="submit" className="btn btn-primary">Ajouter</button>
            </form>
          </div>
          <div className="row">
            <h3>Passer au prochain artiste</h3>
            <button onClick={ this.passerArtiste } className="btn btn-primary"> >> </button>
          </div>
          <div className="row">
            <h3>Artiste actuel</h3>
            <label id="tour">Le tour actuel est à {tour}</label><br></br>
            <label id="artisteActuel">Artiste actuel est {artisteActuel}</label>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
      

*/