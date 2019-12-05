# Atelier audit contrat Crowdsale du groupe B

Rendu de l'audit du contrat Crowdsale commencé en cours, avec tests via Truffle.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
NodeJS
Npm
Truffle
Ganache
```

### Installing & Running the tests

A step by step series of examples that tell you how to get a development env running

Dans un dossier vide, créer un fichier "package.json" contenant les informations qui correspondent à votre environnement

```
{
	"name": "crowdsale",
	"version": "0.0.1",
	"engines": {
		"node": "10.16.3",
		"npm": "6.13.1"
	}
}
```

Dans de ce dossier, installer truffle et lancer la commande init

```
npm install truffle
npx truffle init
```

Configurer le réseau et le compiler du fichier truffle-config.js
```
development: {
      host: "127.0.0.1",     // Localhost
      port: 8545,            // Standard Ethereum port
      network_id: "*",       // Any network
    }
...
optimizer: {
          enabled: false,
          runs: 200
        },
```

Lancer une blockchain avec ganache sur le port 8545 avec ganache-cli ou ganache UI

```
ganache-cli -8545
```

Enfin lancer les tests en tapant la commande depuis le dossier de test

```
truffle test
``` 

## Authors

* **Groupe B** - *Initial work* 
