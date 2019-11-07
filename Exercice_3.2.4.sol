pragma solidity ^0.5.11;
//Attention, la variable "organisateurs" désigne un tableau contenants les adresses des organisateurs et non pas les pourcentages comme dans l'énoncé.

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Cogere {
    using SafeMath for uint;
    uint public placesRestantes = 100000;
    uint private _cagnotte;
    uint private depensesTotales;
    string[] private sponsors;
    uint public dateFestival = 1594807200;//15/07/2020 at 10:00:00
    uint private _dateLiquidation = dateFestival + 2 weeks;
    uint private _depenseLimite = 20000;
    uint private _depenseJour;
    address[] private organisateurs;

    mapping (address => uint) private pourcentage;
    mapping (address => bool) private festivaliers;

    constructor() public {
        pourcentage[msg.sender] = 100;
        organisateurs.push(msg.sender);
    }

    function estOrga(address orga) public view returns (bool){
        if (pourcentage[orga] > 0){
            return true;
        } else {
            return false;
        }
    }

    function transfererOrga(address orga, uint parts) public {
        require(orga != address(0), "address 0");
        require(estOrga(msg.sender), "Vous n'êtes pas organisateur");
        require(pourcentage[msg.sender] >= parts, "Valeure trop élevée");
        pourcentage[msg.sender].sub(parts);
        pourcentage[orga].add(parts);
        organisateurs.push(orga);
    }

    function acheterTicket() public payable {
        require(msg.value >= 500 finney, "Place à 0.5 Ethers");
        require(placesRestantes > 0, "Plus de places");
        _cagnotte.add(msg.value);
        festivaliers[msg.sender] = true;
    }

    function payer(address payable destinataire, uint montant) public {
        require(estOrga(msg.sender), "Vous n'êtes pas organisateur");
        require(destinataire != address(0), "address(0)");
        require(montant > 0, "Valeure trop élevée");
        require(_controleDepenses(montant), "Limite journalière atteinte");
        _depenseJour.add(montant);
        destinataire.transfer(montant);
    }

    function comptabiliserDepense(uint montant) private view{
        depensesTotales.add(montant);
    }

    function () external payable{

    }

    function sponsoriser(string memory nom) public payable{
        require(msg.sender != address(0), "address 0");
        require(msg.value >= 30 ether, "Montant minimum 30 Ethers");
        sponsors.push(nom);
    }

    function _controleDepenses(uint montant) private view returns (bool){
        if (_depenseJour.add(montant) <= _depenseLimite){
            return false;
        } else {
            return true;
        }
    }

    function retraitOrga() private {
        require(block.timestamp >= _dateLiquidation, "Trop tôt");
        if (organisateurs.length == 1) {
            selfdestruct(msg.sender);
        } else {
            msg.sender.transfer(_cagnotte/pourcentage[msg.sender]);
        }
        for (uint i = 0; i < organisateurs.length; i++){
            if (organisateurs[i] == msg.sender){
                delete organisateurs[i];
            }
        }
    }
}