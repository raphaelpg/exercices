pragma solidity ^0.5.12;

contract Assemblee {
    address[] membres;
    struct Decision {
        string description;
        uint votesPour;
        uint votesContre;
        mapping (address => bool) aVote;
    }
    Decision[] decisions;

    function rejoindre() public {
        membres.push(msg.sender);
    }

    function estMembre(address utilisateur) public view returns (bool) {
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

    function proposerDecision(string memory description) public {
        require (estMembre(msg.sender), "Il faut être membre");
        Decision memory nouvelleDecision = Decision(description, 0, 0);
        decisions.push(nouvelleDecision);
    }

    function voter(uint indice, bool value) public {
        require (estMembre(msg.sender), "Il faut être membre");
        require (decisions[indice].aVote[msg.sender] != true, "Vous avez déjà voté pour cette décision");
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
}