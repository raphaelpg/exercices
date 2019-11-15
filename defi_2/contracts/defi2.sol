pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;

//import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract defi2 {
    //using SafeMath for uint;
    enum Etat {OUVERTE, ENCOURS, FERMEE}
    mapping (address => bool) private administrateurs;
    mapping (address => string) public illustrateurs;
    mapping (address => uint) public reputation;
    mapping (address => bool) public bannis;
    mapping (address => Demande) public demandes;
    mapping (address => bool) public entreprises;
    mapping (address => string) public nomsEntreprises;
    
    constructor() public {
        administrateurs[msg.sender] = true;
        reputation[msg.sender] = 10;
    }
    
    struct Demande {
        uint _remuneration;
        uint _delai;
        string _description;
        Etat _etat;
        uint _reputationMini;
        mapping (address => bool) _candidats;
    }
    
    function inscription(string memory nom) public{
        require(bannis[msg.sender] == false, "Vous avez été bannis");
        require(reputation[msg.sender] < 1, "Vous êtes déjà inscrits");
        require(bytes(nom).length != 0, "Veuillez entrer un nom");
        illustrateurs[msg.sender] = nom;
        reputation[msg.sender] = 1;
    }
    
    function bannir(address illustrateur) public{
        require(administrateurs[msg.sender] == true, "Vous n'êtes pas administrateur");
        require(bannis[illustrateur] == false, "L'illustrateur est déjà banni");
        require(reputation[illustrateur] > 0, "L'illustrateur n'est pas inscrit");
        delete illustrateurs[illustrateur];
        reputation[illustrateur] = 0;
        bannis[illustrateur] = true;
    }
    
    function inscrireEntreprise(string memory nomEntreprise) public{
        require(entreprises[msg.sender] == false, "Entreprise déjà inscrite");
        entreprises[msg.sender] = true;
        nomsEntreprises[msg.sender] = nomEntreprise;
    }
    
    function ajouterDemande(uint remuneration, uint delai, string memory description, uint reputationMini) payable public{
        require(entreprises[msg.sender] == true, "Inscrivez l'entreprise d'abord");
        require(msg.value >= (remuneration + (remuneration * 2)/100), "Depost insuffisant, n'oubliez pas les 2% de frais");
        Demande storage nouvelleDemande = demandes[msg.sender];
        nouvelleDemande._remuneration = remuneration;
        nouvelleDemande._delai = delai;
        nouvelleDemande._description = description;
        nouvelleDemande._etat = Etat.OUVERTE;
        nouvelleDemande._reputationMini = reputationMini;
    }
}