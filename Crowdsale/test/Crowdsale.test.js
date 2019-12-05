const { BN, ether } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const Crowdsale = artifacts.require("Crowdsale");
const Token = artifacts.require("Token");

//Test de Token.sol
contract("Token", function(accounts){
    const _name = 'Crowdsale Token';
    const _symbol = 'TOK';
    const _decimals = new BN(18);
    const owner = accounts[0];
    const recipient = accounts[1];
    const sender = accounts[2];

    // Avant chaque test unitaire  
    beforeEach(async function() {
        this.TokenInstance = await Token.new({from: owner});
    });

    //Test token name
    it('test token name is Crowdsale Token', async function () {
        expect(await this.TokenInstance.name()).to.equal(_name);
    });

    //Test token symbol
    it('test token name is TOK', async function () {
        expect(await this.TokenInstance.symbol()).to.equal(_symbol);
    });

    //Test token decimals
    it('test token decimals are 18', async function () {
        expect(await this.TokenInstance.decimals()).to.be.bignumber.equal(_decimals);
    });

    // test totalSupply == balanceOf(owner)
    it('vérifie la balancedu propriétaire du contrat', async function () {
        let balanceOwner = await this.TokenInstance.balanceOf(owner);
        let totalSupply = await this.TokenInstance.totalSupply();
        expect(balanceOwner).to.be.bignumber.equal(totalSupply);
    });

    // test transfer function
    it('test fonction transfer', async function () {
        let balanceOwnerStart = await this.TokenInstance.balanceOf(owner);
        let balanceRecipientStart = await this.TokenInstance.balanceOf(recipient);
        let amount = new BN("10");//ether("10");

        await this.TokenInstance.transfer(recipient, amount);

        let balanceOwner = await this.TokenInstance.balanceOf(owner);
        let balanceRecipient = await this.TokenInstance.balanceOf(recipient);

        expect(balanceRecipient).to.be.bignumber.equal(balanceRecipientStart.add(amount));
        expect(balanceOwner).to.be.bignumber.equal(balanceOwnerStart.sub(amount));
    });

    // test transferFrom function
    it('test fonction transferFrom', async function () {
        let amount = new BN("10");

        await this.TokenInstance.transfer(sender, amount);

        let balanceSenderStart = await this.TokenInstance.balanceOf(sender);
        let balanceRecipientStart = await this.TokenInstance.balanceOf(recipient);

        await this.TokenInstance.approve(recipient, amount, {from: sender});
        await this.TokenInstance.transferFrom(sender, recipient, amount, { from: recipient });

        let balanceSender = await this.TokenInstance.balanceOf(sender);
        let balanceRecipient = await this.TokenInstance.balanceOf(recipient);

        expect(balanceRecipient).to.be.bignumber.equal(balanceRecipientStart.add(amount));
        expect(balanceSender).to.be.bignumber.equal(balanceSenderStart.sub(amount));
    });

})

//Test de Crowdsale.sol
contract("Crowdsale", function(accounts){
    const _owner = accounts[0];
    const _sender1 = accounts[1];
    const _sender2 = accounts[2];
    const _target = ether("100");
    const _initialBalance = new BN(0);
    const _initialCrowdsaleEndState = false;
    let catchRevert = require("./exceptions.js").catchRevert;

    // Avant chaque test unitaire  
    beforeEach(async function() {
        this.CrowdsaleInstance = await Crowdsale.new(_owner, _target, {from: _owner});
    });

    //Test savedBalance initiale à 0
    it('test savedBalance init', async function () {
        expect(await this.CrowdsaleInstance.savedBalance()).to.be.bignumber.equal(_initialBalance);
    });

    //Test target
    it('test target init', async function () {
        expect(await this.CrowdsaleInstance.target()).to.be.bignumber.equal(_target);
    });

    //Test état crowdsaleEnd égal à false au déploiement
    it('vérifie état de la variable crowdsaleEnd est false au déploiment', async function () {
        expect(await this.CrowdsaleInstance.crowdsaleEnd()).to.equal(_initialCrowdsaleEndState);
    })

    //Test fonction setEnd()
    it('vérifie fonctionnement de la fonction setEnd()', async function () {
        let crowdsaleEndTest = true;
        
        await this.CrowdsaleInstance.setEnd();
        let crowdsaleEndState = await this.CrowdsaleInstance.crowdsaleEnd();

        expect(crowdsaleEndState).to.equal(crowdsaleEndTest);
    });

    //Test savedBalance update
    it("vérifie que savedBalance s'actualise", async function () {
        let savedBalanceStart = await this.CrowdsaleInstance.savedBalance();

        let amount = new BN("10");
        await this.CrowdsaleInstance.invest({from: _sender1, value:amount});
        
        let savedBalanceEnd = await this.CrowdsaleInstance.savedBalance();
        expect(savedBalanceEnd).to.be.bignumber.equal(savedBalanceStart.add(amount)); 
    });

    //Test balances[msg.sender] update avec la fonction invest()
    it("vérifie que balances[msg.sender] s'actualise correctement", async function () {
        let balancesMsgSenderStart = await this.CrowdsaleInstance.balances.call(_sender1);

        let amount = new BN("10");
        await this.CrowdsaleInstance.invest({from: _sender1, value:amount});
        
        let balancesMsgSenderEnd = await this.CrowdsaleInstance.balances.call(_sender1);
        expect(balancesMsgSenderEnd).to.be.bignumber.equal(balancesMsgSenderStart.add(amount)); 
    });  

    //Test fonction invest()
    it("vérifie la fonction invest", async function () {
        let savedBalanceStart = await this.CrowdsaleInstance.savedBalance();
        let balancesMsgSenderStart = await this.CrowdsaleInstance.balances.call(_sender1);

        let amount = new BN("10");
        await this.CrowdsaleInstance.invest({from: _sender1, value:amount});
        
        let savedBalanceEnd = await this.CrowdsaleInstance.savedBalance();        
        let balancesMsgSenderEnd = await this.CrowdsaleInstance.balances.call(_sender1);
        expect(savedBalanceEnd).to.be.bignumber.equal(savedBalanceStart.add(amount)); 
        expect(balancesMsgSenderEnd).to.be.bignumber.equal(balancesMsgSenderStart.add(amount)); 
    });


    //Test fonction giveMoneyBack()
    it('vérifie fonctionnement de la fonction giveMoneyBack()', async function () {
        let amount = new BN("10");
        let amount2 = new BN("20");
        await this.CrowdsaleInstance.invest({from: _sender1, value:amount});
        await this.CrowdsaleInstance.invest({from: _sender2, value:amount2});

        let savedBalanceStart = await this.CrowdsaleInstance.savedBalance();
        let balancesMsgSenderStart = await this.CrowdsaleInstance.balances.call(_sender1);

        await this.CrowdsaleInstance.setEnd();
        await this.CrowdsaleInstance.giveMoneyBack({from: _sender1});

        let savedBalanceEnd = await this.CrowdsaleInstance.savedBalance();        
        let balancesMsgSenderEnd = await this.CrowdsaleInstance.balances.call(_sender1);

        expect(savedBalanceEnd).to.be.bignumber.equal(savedBalanceStart.sub(amount)); 
        expect(balancesMsgSenderEnd).to.be.bignumber.equal(new BN("0")); 
    });

    //Test fonction paused()
    it('vérifie fonctionnement de la fonction pause()', async function () {
        await this.CrowdsaleInstance.pause({from: _owner});

        let amount = new BN("10");
        await catchRevert(this.CrowdsaleInstance.invest({from: _sender1, value:amount}));

        await this.CrowdsaleInstance.unpause({from: _owner});
        await this.CrowdsaleInstance.invest({from: _sender1, value:amount});
        await this.CrowdsaleInstance.pause({from: _owner});
        await catchRevert(this.CrowdsaleInstance.giveMoneyBack({from: _sender1}));
    });
})
