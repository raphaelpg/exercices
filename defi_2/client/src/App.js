import Web3 from 'web3';
import Defi2 from './contracts/Defi2.json';
import React, {Component } from 'react';
import './App.css';
import DappHeader from './components/dappHeader';
import OffreItem from "./components/OffreItem";

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
      offers: [],
      contenuHasher: '',
      contenuStyle: {width: '90%', display: 'none'},
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
      const offers = [];
      const demandesCompteur = await contrat.methods.demandesCompteur().call();
      for (let i = 0; i < demandesCompteur; i++) {
        const demande = await contrat.methods.demandes(i).call();
        demande._addressCandidats = [];
        demande._nomsCandidats = [];
        const nbCandidatOffre = await contrat.methods.nbCandidatOffre(i).call();
        for (let j = 0; j < nbCandidatOffre; j++) {
          const address = await contrat.methods.addressCandidatOffre(i, j).call();
          demande._addressCandidats.push(address);
          const nom = await contrat.methods.nomCandidatOffre(i, j).call();
          demande._nomsCandidats.push(nom);
        }
        offers.push(demande);
      }
      this.setState({
        contrat : contrat._address,
        offers: offers
      })
    } else {
      window.alert('Defi2 contract not deployed to detected network.')
    }
  }

  //inscription(string memory nom)
  async inscription(name){
    const { web3, contrat, account } = this.state
    const myContract = new web3.eth.Contract(Defi2.abi, contrat)
    await myContract.methods.inscription(name).send({from: account})
  }

  //ajouterDemande(uint remuneration, uint delai, string memory description, uint reputationMini)
  async ajouterDemande(remunerationOffre, delaiOffre, descriptionOffre, reputationMiniOffre) {
    const { web3, contrat, account } = this.state
    const myContract = new web3.eth.Contract(Defi2.abi, contrat)
    let cost = remunerationOffre + (Math.ceil((remunerationOffre * 2) / 100))
    await myContract.methods.ajouterDemande(remunerationOffre, delaiOffre, descriptionOffre, reputationMiniOffre).send({from: account, value: cost})
  }

  //produireHash(string memory url)
  async produireHash(contenu) {
    const { web3, contrat } = this.state
    const myContract = new web3.eth.Contract(Defi2.abi, contrat)
    const contenuHasher = await myContract.methods.produireHash(contenu).call()
    this.setState({contenuHasher});
    this.setState({contenuStyle: {width: '90%', display: 'block'}});
  }

  render() {
    const { web3, account, contrat, offers, contenuHasher } = this.state;
    const { contenuStyle } = this.state;
    return (
      <React.Fragment>
        <div className="App">
          <DappHeader />
          <main>
            <div className="mainConteneur">
              <div className="mainConteneurChild">
                <div id="inscriptionUtilisateur" className="conteneur">
                  Inscription:
                  <form onSubmit={(event) => {
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

                <div id="ajouterDemande" className="conteneur">
                  <form onSubmit={(event) => {
                      event.preventDefault()
                      const remuneration = this.remunerationForm.value
                      const delai = this.delaiForm.value
                      const description = this.descriptionForm.value
                      const reputationMini = this.reputationMiniForm.value
                      this.ajouterDemande(remuneration, delai, description, reputationMini)
                    }}>Proposer une offre:
                      <div className="champs">
                        <div className="formulaireItems" >Remuneration: 
                        <input id="remunerationForm" type="text" ref={(input) => { this.remunerationForm = input }} required/>
                        </div>
                        <div className="formulaireItems" >Delai: 
                        <input id="delaiForm" type="text" ref={(input) => { this.delaiForm = input }} required/>
                        </div>
                        <div className="formulaireItems" >Description: 
                        <input id="descriptionForm" type="text" ref={(input) => { this.descriptionForm = input }} required/>
                        </div>
                        <div className="formulaireItems" >Réputation minimum: 
                        <input id="reputationMiniForm" type="text" ref={(input) => { this.reputationMiniForm = input }} required/>
                        </div>
                      </div>
                    <button type="submit" >Ajouter offre</button>
                  </form>
                </div>

                <div id="hasher" className="conteneur">
                  Hasher:
                  <form onSubmit={(event) => {
                      event.preventDefault()
                      const lienAHasher = this.lien.value
                      this.produireHash(lienAHasher)
                    }}>
                    <div className="champs">
                      <div className="formulaireItems">Lien à hasher: 
                      <input id="lien" type="text" ref={(input) => { this.lien = input }} required/>
                      </div>
                      <div className="formulaireItems">
                      <textarea id="contenuHasher" value={contenuHasher} style={contenuStyle}></textarea>
                      </div>
                    </div>
                    <button type="submit" >Valider</button>
                  </form>
                </div>

              </div>

              <div className="mainConteneurChild">
                <div id="listeOffres" className="conteneur">
                Liste des offres:
                <ul>
                  { offers.map( (offre, numeroOffre) => <OffreItem web3={web3} account={account} contrat={contrat} key={numeroOffre.toString()} offre={offre} numeroOffre={numeroOffre} />)}
                </ul>
                </div>
              </div>
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