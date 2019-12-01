pragma solidity ^0.5.12;

contract ERC721 {
    Required methods
    function totalSupply() public view returns (uint256 total);
    function balanceOf(address _owner) public view returns (uint256 balance);
    function ownerOf(uint256 _tokenId) external view returns (address owner);
    function approve(address _to, uint256 _tokenId) external;
    function transfer(address _to, uint256 _tokenId) external;
    function transferFrom(address _from, address _to, uint256 _tokenId) external;

    Events
    event Transfer(address from, address to, uint256 tokenId);
    event Approval(address owner, address approved, uint256 tokenId);

    Optional
    function name() public view returns (string name);
    function symbol() public view returns (string symbol);
    function tokensOfOwner(address _owner) external view returns (uint256[] tokenIds);
    function tokenMetadata(uint256 _tokenId, string _preferredTransport) public view returns (string infoUrl);

    ERC-165 Compatibility (https://github.com/ethereum/EIPs/issues/165)
    function supportsInterface(bytes4 _interfaceID) external view returns (bool);
}

contract ObjetsMagiques {
    //struct
    struct ObjetMagique {
        string _rarete;
        string _type;
        string _materiau;
        string _modele;
    }
    
    struct Owner {
        uint _ownerId; 
    }
    
    //variables
    string public name = "Objets Magiques";
    string public symbol = "OM7";
    uint256 private _totalSupply = 9999;
    uint[] public allObjectsIds;//Array containing objects as structs, array position is object ID
    Owner[] public allOwners;//Array containing owners as structs
    uint private _ownerCount;//total owners number
    string[] private _propriete = ["courant", "rare", "divin", "epee", "sceptre", "hache", "bronze", "argent", "or", "noir", "blanc", "rouge"];
    
    //mappings
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) public objects;//unique non fungible objects
    mapping(address => uint256) public owners;//owners ID
    mapping(uint256 => ObjetMagique) public objectList;//mapping of objects
    mapping(uint256 => bool) private _objectExists;//compare objects ID
    mapping(address => bool) private _ownerExists;
    mapping(address => mapping(address => uint256)) allowed;//transfer allowances
    
    //events
    event Transfer(address indexed _from, address indexed _to, uint256 _objectId);
    event Approval(address indexed _owner, address indexed _approved, uint256 _objectId);
    
    //modifier
    
    //constructor
    constructor() public {
        _ownerCount = 0;
    }
    
    //functions
    function registerOwner() public returns(uint256){
        require(_ownerExists[msg.sender] == false,"You are already registered");
        owners[msg.sender] = (_ownerCount+1);    
        Owner memory newOwner;
        newOwner._ownerId = (_ownerCount+1);
        allOwners.push(newOwner);
        _ownerCount += 1;
        _ownerExists[msg.sender] = true;
        return newOwner._ownerId;
    }
    
    function totalSupply() public view returns (uint256){
        return _totalSupply;
    }
    
    function balanceOf(address _owner) public view returns (uint balance){
        return _balances[_owner];
    }
    
    function transfer(address receiver, uint256 _objectId) public {
        require(_objectExists[_objectId]);
        require(objects[_objectId] == msg.sender);
        require(msg.sender != receiver);
        require(receiver != address(0));
        _balances[msg.sender] -= 1;
        objects[_objectId] = receiver;
        _balances[receiver] += 1;
        emit Transfer(msg.sender, receiver, _objectId);
    }

    function generateId() public view returns(uint){
        uint randomRarete = ((block.number)*9876*owners[msg.sender])%3;
        uint randomType = ((block.number)*8765*owners[msg.sender])%3;
        uint randomMateriau = ((block.number)*7654*owners[msg.sender])%3;
        uint randomModele = ((block.number)*6543*owners[msg.sender])%3;
        uint randomId = randomRarete*1000 + randomType*100 + randomMateriau*10 + randomModele;
        return randomId;
    }

    function creuser() public payable returns(uint256){
        require(_ownerExists[msg.sender] == true,"You have to register first");
        require(msg.value >= 0.1 ether,"msg.value too low, minimum 0.1 ether");
        ObjetMagique memory newObjetMagique;
        //generating 4 different numbers (from 0 to 2)
        uint newObjetMagiqueId = generateId();
        require(_objectExists[newObjetMagiqueId] == false,"Created object already exists, please retry");
        //_propriete array contains 12 elements, each property has 3 possibilities
        newObjetMagique._rarete = _propriete[(newObjetMagiqueId/1000)%3];
        newObjetMagique._type = _propriete[3+((newObjetMagiqueId/100)%3)];
        newObjetMagique._materiau = _propriete[6+((newObjetMagiqueId/10)%3)];
        newObjetMagique._modele = _propriete[9+(newObjetMagiqueId%3)];
        objects[newObjetMagiqueId] = msg.sender;
        _objectExists[newObjetMagiqueId] = true;
        _balances[msg.sender] += 1;
        allObjectsIds.push(newObjetMagiqueId);
        objectList[newObjetMagiqueId] = newObjetMagique;
        return newObjetMagiqueId;
    }
}