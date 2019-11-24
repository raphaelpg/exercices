// import Web3 from 'web3';
import Defi2 from '../contracts/Defi2.json';
import React, { Component } from 'react';

class OffreItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offre: props.offre,
            numeroOffre: props.numeroOffre,
            contrat: props.contrat,
            web3: props.web3,
            account: props.account
        };
        this.postuler = this.postuler.bind(this);
        this.accepterOffre = this.accepterOffre.bind(this);
        this.livraison = this.livraison.bind(this);
        this.retirerFonds = this.retirerFonds.bind(this);
        this.sanctionner = this.sanctionner.bind(this);
    }

    etat(etatNumber) {
        switch (etatNumber) {
            case 0:
                return "Ouverte";
            case 1:
                return "En cours";
            case 2:
                return "Fermée";
            default:
                return "Erreur";
        }
    }

    //postuler(uint numeroOffre)
    async postuler() {
        const { web3, contrat, account, numeroOffre } = this.state
        const myContract = new web3.eth.Contract(Defi2.abi, contrat)
        await myContract.methods.postuler(numeroOffre).send({from: account})
    }


    //accepterOffre(uint numeroOffre, address elu)
    async accepterOffre() {
        const { web3, contrat, account, numeroOffre } = this.state
        const elu = this.elu.value;
        const myContract = new web3.eth.Contract(Defi2.abi, contrat)
        await myContract.methods.accepterOffre(numeroOffre, elu).send({from: account})
    }

    //livraison(uint numeroOffre, bytes32 rendu)
    async livraison(){
        const { web3, contrat, account, numeroOffre } = this.state
        const travail = this.travail.value;
        console.log(travail);
        const myContract = new web3.eth.Contract(Defi2.abi, contrat)
        const travailHash = await myContract.methods.produireHash(travail).call();
        console.log(travailHash);
        await myContract.methods.livraison(numeroOffre, travailHash).send({from: account})
    }


    //retirerFonds(uint numeroOffre)
    async retirerFonds(){
        const { web3, contrat, account, numeroOffre } = this.state
        const myContract = new web3.eth.Contract(Defi2.abi, contrat)
        await myContract.methods.retirerFonds(numeroOffre).send({from: account})
    }

    //sanctionner(uint numeroOffre)
    async sanctionner(){
        const { web3, contrat, account, numeroOffre } = this.state
        const myContract = new web3.eth.Contract(Defi2.abi, contrat)
        await myContract.methods.sanctionner(numeroOffre).send({from: account})
    }


    render() {
        const { account, offre } = this.state;
        return (
            <li className="OffreItem" >
                <div className="conteneur offre">
                    <div>Propriétaire :</div><p>{ offre._proprietaire }</p>
                    <div className="soustitre1">Rémunération : </div><p>{ offre._remuneration } wei</p>
                    <div className="soustitre1">Durée : </div><p>{ offre._delai / 86400 } jour(s)</p>
                    <div className="soustitre1">Description : </div><p>{ offre._description }</p>
                    <div className="soustitre1">État : </div><p>{ this.etat(parseInt(offre._etat)) }</p>
                    <div className="soustitre1">Réputation minimale : </div><p>{ offre._reputationMini }</p>
                    { (offre._etat) === "0" && (offre._proprietaire !== account) ?
                        <div><button onClick={ this.postuler }>Candidater</button></div> : null
                    }
                    { (offre._etat) === "0" && (offre._proprietaire === account) ?
                        <div>
                            <select id="elu" ref={(input) => {this.elu = input}} >
                                {offre._addressCandidats.map((address, index) => {
                                    return (<option key={index.toString()} value={address}>{ offre._nomsCandidats[index] }</option>)
                                })}
                            </select>
                            <button onClick={ this.accepterOffre }>Accepter candidature</button>
                        </div> : null
                    }
                    { (offre._etat) === "1" && (offre._elu === account) ?
                        <div>
                            <input type="text" id="travail" ref={(input) => {this.travail = input}} />
                            <button onClick={ this.livraison }>Livrer</button>
                        </div> : null
                    }
                    { (offre._etat) === "2" && (offre._elu === account) ?
                        <div>
                            <button onClick={ this.retirerFonds }>Retirer fonds</button>
                        </div> : null
                    }
                    { (offre._etat) === "2" && (offre._proprietaire === account) ?
                        <div>
                            <button onClick={ this.sanctionner }>Sanctionner</button>
                        </div> : null
                    }
                    {/* { JSON.stringify(offre) } */}
                </div>
            </li>
        );
    }
}

export default OffreItem;