pragma solidity ^0.5.11;
//Attention, la variable "organisateurs" désigne un tableau contenants les adresses des organisateurs et non pas les pourcentages comme dans l'énoncé.

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Cagnotte {
    using SafeMath for uint;
    address[] private organisateurs;
    string[] private sponsors;
    uint public placesRestantes = 100000;
    uint private _depensesTotales;
    uint private _depenseLimite = 20000;
    uint public dateFestival;
    uint _dateLiquidation = dateFestival + 2 weeks;

    mapping (address => uint) private pourcentage;
    mapping (address => bool) private festivaliers;
    mapping (uint => uint) private depensesJour;

    constructor() public {
        pourcentage[msg.sender] = 100;
        organisateurs.push(msg.sender);
        dateFestival = block.timestamp;
    }

    function estOrga(address orga) public view returns (bool){
        require(orga != address(0), "address 0");
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
        pourcentage[msg.sender] = pourcentage[msg.sender].sub(parts);
        pourcentage[orga] = pourcentage[orga].add(parts);
        organisateurs.push(orga);
    }

    function acheterTicket() public payable {
        require(msg.value >= 500 finney, "Place à 0.5 Ethers");
        require(placesRestantes > 0, "Plus de places");
        festivaliers[msg.sender] = true;
        placesRestantes = placesRestantes.sub(1);
    }

    function payer(address payable destinataire, uint montant) public {
        require(estOrga(msg.sender), "Vous n'êtes pas organisateur");
        require(destinataire != address(0), "address(0)");
        require(montant > 0, "Entrez une valeure");
        require(address(this).balance >= montant, "Fonds insufissante");
        require(_comptabiliserDepense(montant), "Limite journalière atteinte");
        if (((block.timestamp)/ 1 days) == depensesJour[0]){
            depensesJour[0] = ((block.timestamp)/ 1 days); 
        }
        depensesJour[(block.timestamp)/ 1 days] = depensesJour[(block.timestamp)/ 1 days].add(montant);
        _depensesTotales = _depensesTotales.add(montant);
        destinataire.transfer(montant);
    }

    function _comptabiliserDepense(uint montant) private view returns (bool){
        if (depensesJour[(block.timestamp)/ 1 days].add(montant) > _depenseLimite){
            return false;
        } else {
            return true;
        }
    }
    
    function voirDepensesTotales() public view returns (uint){
        require(estOrga(msg.sender), "Vous n'êtes pas organisateur");
        return _depensesTotales;
    }

    function sponsoriser(string memory nom) public payable{
        require(msg.value >= 30 ether, "Montant minimum 30 Ethers");
        sponsors.push(nom);
    }

    function _retraitOrga() private {
        require(block.timestamp >= _dateLiquidation, "Trop tôt");
        if (organisateurs.length == 1) {
            selfdestruct(msg.sender);
        } else {
            msg.sender.transfer(address(this).balance/pourcentage[msg.sender]);
        }
        for (uint i = 0; i < organisateurs.length; i++){
            if (organisateurs[i] == msg.sender){
                delete organisateurs[i];
            }
        }
    }
    
    function() external payable{

    }
}