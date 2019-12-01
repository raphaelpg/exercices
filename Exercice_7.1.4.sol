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
        Rarete _rarete;
        Type _type;
        Materiau _materiau;
        Modele _modele;
    }
    
    struct Owner {
        uint _ownerId; 
    }
    
    //variables
    string public name = "Objets Magiques";
    string public symbol = "OM7";
    uint256 private _totalSupply = 9999;
    ObjetMagique[] private allObjects;//Array containing objects as structs, array position is object ID
    Owner[] private allOwners;//Array containing owners as structs
    uint private _ownerCount;//total owners number
    enum Rarete {COURANT, RARE, DIVIN}
    enum Type {EPEE, SCEPTRE, HACHE, ARC, BOUCLIER, CASQUE, ARMURE, BOTTES}
    enum Materiau {BRONZE, ACIER, ARGENT, OR}
    enum Modele {NOIR, BLANC, ROUGE, BLEU, VERT, JAUNE}
    //uint256 public decimals = 18;
    
    //mappings
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) public objects;//unique non fungible objects
    mapping(address => uint256) public owners;//owners ID
    mapping(uint256 => ObjetMagique) public objectList;//mapping of objects
    mapping(uint256 => bool) private _objectExists;
    mapping(address => bool) private _ownerExists;
    mapping(address => mapping(address => uint256)) allowed;//transfer allowances
    
    //events
    event Transfer(address indexed _from, address indexed _to, uint256 _objectId);
    event Approval(address indexed _owner, address indexed _approved, uint256 _objectId);
    
    //modifier
    
    //constructor
    constructor() public {
        _ownerCount = 0;
        //First object
        ObjetMagique memory newObjetMagique1; 
        newObjetMagique1._rarete = Rarete.DIVIN;
        newObjetMagique1._type = Type.ARC;
        newObjetMagique1._materiau = Materiau.OR;
        newObjetMagique1._modele = Modele.JAUNE;
        objects[(allObjects.length + 1)] = msg.sender;
        _objectExists[(allObjects.length + 1)] = true;
        _balances[msg.sender] += 1;
        allObjects.push(newObjetMagique1);
        objectList[(allObjects.length + 1)] = newObjetMagique1;
        
        //Second object
        ObjetMagique memory newObjetMagique2; 
        newObjetMagique2._rarete = Rarete.RARE;
        newObjetMagique2._type = Type.EPEE;
        newObjetMagique2._materiau = Materiau.ARGENT;
        newObjetMagique2._modele = Modele.VERT;
        objects[(allObjects.length + 1)] = msg.sender;
        _objectExists[(allObjects.length + 1)] = true;
        _balances[msg.sender] += 1;
        allObjects.push(newObjetMagique2);
        objectList[(allObjects.length + 1)] = newObjetMagique2;
        
        //Third object
        ObjetMagique memory newObjetMagique3; 
        newObjetMagique3._rarete = Rarete.COURANT;
        newObjetMagique3._type = Type.HACHE;
        newObjetMagique3._materiau = Materiau.BRONZE;
        newObjetMagique3._modele = Modele.ROUGE;
        objects[(allObjects.length + 1)] = msg.sender;
        _objectExists[(allObjects.length + 1)] = true;
        _balances[msg.sender] += 1;
        allObjects.push(newObjetMagique3);
        objectList[(allObjects.length + 1)] = newObjetMagique3;
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
}