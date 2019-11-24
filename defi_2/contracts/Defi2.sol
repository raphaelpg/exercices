pragma solidity ^0.5.11;
//pragma experimental ABIEncoderV2;

//import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Defi2 {
    //using SafeMath for uint;

    struct Demande {
        address _proprietaire;
        uint _remuneration;
        uint _delai;
        string _description;
        Etat _etat;
        uint _reputationMini;
        bytes32 _travail;
        bool _fondsDispo;
        uint _debut;
        uint _finPrevu;
        uint _finReelle;
        address _elu;
        address[] _addressCandidats;
        string[] _nomsCandidats;
        mapping (address => bool) _candidats;
    }

    enum Etat {OUVERTE, ENCOURS, FERMEE}
    uint public demandesCompteur;
    Demande[] public demandes;

    mapping (address => bool) private administrateurs;
    mapping (address => string) public utilisateurs;
    mapping (address => uint) public reputation;
    mapping (address => bool) public bannis;
    
    constructor() public {
        administrateurs[msg.sender] = true;
        reputation[msg.sender] = 1;
    }
    
    function inscription(string memory nom) public{
        require(bannis[msg.sender] == false, "Vous avez été bannis");
        require(bytes(nom).length != 0, "Veuillez entrer un nom");
        utilisateurs[msg.sender] = nom;
        reputation[msg.sender] = 1;
    }
    
    function bannir(address user) public{
        require(administrateurs[msg.sender] == true, "Vous n'êtes pas administrateur");
        require(bannis[user] == false, "Utilisateur déjà banni");
        require(reputation[user] > 0, "Utilisateur pas inscrit");
        reputation[user] = 0;
        bannis[user] = true;
    }
    
    function ajouterDemande(uint remuneration, uint delai, string memory description, uint reputationMini) public payable{
        require(bannis[msg.sender] == false, "Vous avez été banni");
        require(reputation[msg.sender] > 0, "Vous devez être inscrit");
        require(msg.value >= (remuneration + (remuneration * 2)/100), "Depost insuffisant, n'oubliez pas les 2% de frais");
        Demande memory nouvelleDemande;
        nouvelleDemande._proprietaire = msg.sender;
        nouvelleDemande._remuneration = remuneration;
        nouvelleDemande._delai = delai * 1 days;
        nouvelleDemande._description = description;
        nouvelleDemande._etat = Etat.OUVERTE;
        nouvelleDemande._reputationMini = reputationMini;
        nouvelleDemande._travail = '';
        nouvelleDemande._fondsDispo = false;
        demandes.push(nouvelleDemande);
        demandesCompteur += 1;
    }

    function postuler(uint numeroOffre) public{
        require(demandes[numeroOffre]._etat == Etat.OUVERTE, "Cette offre n'est plus ouverte au candidatures");
        require(bannis[msg.sender] == false, "Vous avez été banni");
        require(reputation[msg.sender] > 0, "Vous devez être inscrit");
        require(demandes[numeroOffre]._proprietaire != msg.sender, "Vous êtes le propriétaire");
        require(demandes[numeroOffre]._candidats[msg.sender] == false, "Vous avez déjà candidaté");
        demandes[numeroOffre]._candidats[msg.sender] = true;
        demandes[numeroOffre]._addressCandidats.push(msg.sender);
        demandes[numeroOffre]._nomsCandidats.push(utilisateurs[msg.sender]);
    }

    function accepterOffre(uint numeroOffre, address elu) public{
        require(demandes[numeroOffre]._proprietaire == msg.sender, "Vous n'êtes pas le propriétaire de cette offre");
        require(demandes[numeroOffre]._etat == Etat.OUVERTE, "Cette offre n'est plus ouverte");
        require(demandes[numeroOffre]._candidats[elu] == true, "Cet illustrateur n'a pas candidaté");
        demandes[numeroOffre]._etat = Etat.ENCOURS;
        demandes[numeroOffre]._elu = elu;
        demandes[numeroOffre]._debut = now;
        demandes[numeroOffre]._finPrevu = demandes[numeroOffre]._delai + demandes[numeroOffre]._debut;
    }

    function produireHash(string memory url) public pure returns(bytes32){
       return keccak256(bytes(url));
    }

    function livraison(uint numeroOffre, bytes32 rendu) public{
        require(demandes[numeroOffre]._etat == Etat.ENCOURS, "Cette offre n'est plus en cours");
        require(demandes[numeroOffre]._elu == msg.sender, "Vous n'êtes pas l'illustrateur de cette offre");
        demandes[numeroOffre]._travail = rendu;
        demandes[numeroOffre]._etat = Etat.FERMEE;
        reputation[msg.sender] += 1;
        demandes[numeroOffre]._fondsDispo = true;
        demandes[numeroOffre]._finReelle = now;
    }

    function retirerFonds(uint numeroOffre) public{
        require(demandes[numeroOffre]._etat == Etat.FERMEE, "Cette offre n'est pas fermée");
        require(demandes[numeroOffre]._elu == msg.sender, "Vous n'êtes pas l'illustrateur de cette offre");
        require(demandes[numeroOffre]._fondsDispo == true, "Les fonds ne sont pas disponibles");
        msg.sender.transfer(demandes[numeroOffre]._remuneration);
        demandes[numeroOffre]._fondsDispo = false;
    }

    function sanctionner(uint numeroOffre) public{
        require(demandes[numeroOffre]._proprietaire == msg.sender, "Vous n'êtes pas le propriétaire de cette offre");
        require(demandes[numeroOffre]._finReelle > demandes[numeroOffre]._finPrevu, "La livraison n'est pas en retard");
        if (reputation[demandes[numeroOffre]._elu] > 1){
            reputation[demandes[numeroOffre]._elu] -= 1;
        }
    }

    function nbCandidatOffre(uint numeroOffre) public view returns(uint) {
        require(numeroOffre < demandesCompteur, "Offre non existante");
        return demandes[numeroOffre]._addressCandidats.length;
    }

    function addressCandidatOffre(uint numeroOffre, uint numeroCandidat) public view returns(address) {
        require(numeroOffre < demandesCompteur, "Offre non existante");
        require(numeroCandidat < demandes[numeroOffre]._addressCandidats.length, "Candidat non existant");
        return demandes[numeroOffre]._addressCandidats[numeroCandidat];
    }

    function nomCandidatOffre(uint numeroOffre, uint numeroCandidat) public view returns(string memory) {
        require(numeroOffre < demandesCompteur, "Offre non existante");
        require(numeroCandidat < demandes[numeroOffre]._nomsCandidats.length, "Candidat non existant");
        return demandes[numeroOffre]._nomsCandidats[numeroCandidat];
    }
}