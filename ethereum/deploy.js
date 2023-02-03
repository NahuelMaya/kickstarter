const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require ('web3');
const compiledFactory = require('./build/CampaignFactory.json');

require('dotenv').config({path:"../.env"});

const METAMASK_SEED = process.env.METAMASK_SEED;
const INFURA_GOERLI_KEY = process.env.INFURA_GOERLI_KEY;

//wallet intance
const provider = new HDWalletProvider(
    METAMASK_SEED,
    `https://goerli.infura.io/v3/${INFURA_GOERLI_KEY}`
);
console.log('Wallet instase Ok');


const web3 = new Web3(provider);
console.log('Web3 instase Ok');

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
 
    console.log('Attempting to deploy from account', accounts[0]);

    const contract = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ gas: '1400000', from: accounts[0]})

    console.log('Contract deployed to', contract.options.address);

    //prevent hanging deployment
    provider.engine.stop();
};

deploy();