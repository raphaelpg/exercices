pragma solidity ^0.5.11;

contract Assemblee {
    string public nomAssemblee;
    address[] private membres;
    mapping (address => uint) blame;
    address[] private bannis;
    address[] private administrateurs;
    struct Decision {
        string description;
        uint votesPour;
        uint votesContre;
        bool election;
        address candidat;
        bool enCours;
        mapping (address => bool) aVote;
    }
    Decision[] private decisions;

    constructor(string memory nom) public{
        nomAssemblee = nom;
        membres.push(msg.sender);
        administrateurs.push(msg.sender);
    }

    function rejoindre() public{
        require(!estBanni(msg.sender), "Vous avez été banni");
        require(!estMembre(msg.sender), "Vous êtes déjà membre");
        membres.push(msg.sender);
        blame[msg.sender] = 0;
    }

    function estMembre(address utilisateur) public view returns (bool){
        bool there;
        for (uint i = 0; i < membres.length; i++){
            if (membres[i] == utilisateur){
                there = true;
            } else {
                there = false;
            }
        }
        return there;
    }

    function proposerDecision(string memory description) public{
        require (estMembre(msg.sender), "Il faut être membre pour proposer une décision");
        Decision memory nouvelleDecision = Decision(description, 0, 0, false, msg.sender, true);
        decisions.push(nouvelleDecision);
    }

    function voter(uint indice, bool value) public{
        require (estMembre(msg.sender), "Il faut être membre pour voter");
        require (decisions[indice].aVote[msg.sender] != true, "Vous avez déjà voté pour cette décision");
        require(decisions[indice].enCours == true, "Decision déjà close");
        if(value == true){
            decisions[indice].votesPour += 1;
        } else if(value == false){
            decisions[indice].votesContre += 1;
        }
        decisions[indice].aVote[msg.sender] = true;
    }

    function comptabiliser(uint indice) public view returns (int){
        int resultat;
        resultat = int(decisions[indice].votesPour - decisions[indice].votesContre);
        return resultat;
    }

    function estAdmin(address utilisateur) public view returns (bool){
        bool there;
        for (uint i = 0; i < membres.length; i++){
            if (administrateurs[i] == utilisateur){
                there = true;
            } else {
                there = false;
            }
        }
        return there;
    }

    function nommerAdmin(address nouveauAdmin) public{
        require(estMembre(nouveauAdmin), "Il faut être un membre pour être administrateur");
        require(estAdmin(msg.sender), "Vous n'avez pas les droits suffisants");
        administrateurs.push(nouveauAdmin);
    }

    function demissionnerAdmin() public{
        require(estAdmin(msg.sender), "Vous n'êtes déjà pas administrateur");
        for (uint i = 0; i < administrateurs.length; i++){
            if (administrateurs[i] == msg.sender){
                delete administrateurs[i];
            }
        }
    }

    function fermerDecision(uint indice) public{
        require(estAdmin(msg.sender), "Vous n'avez pas les droits suffisants");
        delete decisions[indice];
    }

    function blamer(address accuse) public{
        require(estAdmin(msg.sender), "Vous n'avez pas les droits suffisants");
        require(!estAdmin(accuse), "Vous ne pouvez pas blâmer un administrateur");
        require(estMembre(accuse), "L'accusé n'est pas membre");
        require(!estBanni(accuse), "Accusé déjà banni");
        if (blame[accuse] < 1){
            blame[accuse] += 1;
        } else {
            bannis.push(accuse);
            for (uint i = 0; i < membres.length; i++){
                if (membres[i] == accuse){
                    delete membres[i];
                }
            }
        }
    }

    function estBanni(address utilisateur) public view returns (bool){
        bool there;
        for (uint i = 0; i < bannis.length; i++){
            if (bannis[i] == utilisateur){
                there = true;
            } else {
                there = false;
            }
        }
        return there;
    }

    function candidater() public{
        require (estMembre(msg.sender), "Il faut être membre pour candidater");
        require (!estAdmin(msg.sender), "Le candidat est déjà administrateur");
        Decision memory nouvelleDecision = Decision("Election administrateur", 0, 0, true, msg.sender, true);
        decisions.push(nouvelleDecision);
    }

    function cloturer(uint decisionIndice) public{
        require(estAdmin(msg.sender), "Vous n'avez pas les droits suffisants");
        require(decisions[decisionIndice].enCours == true, "Decision déjà close");
        if (comptabiliser(decisionIndice) > 0){
            administrateurs.push(decisions[decisionIndice].candidat);
            decisions[decisionIndice].enCours = false;
        } else {
            decisions[decisionIndice].enCours = false;
        }
    }
}