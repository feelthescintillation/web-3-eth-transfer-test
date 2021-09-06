# web-3-eth-transfer-test

This will do a transfer of eth from configured address (public/private key pair) to another address. I tested this in ropsten test network

1. Have a valid ETH wallet.
2. List contract details for contract details in constant file ( Devs for Revolution committed)

Do this before running

- [x] infura.io account with a valid ETH project created, you will need the key/url
- [x] Valid ETH wallet, eg get a ropsten test address from metamask plugin
- [x] buy some ethers for your wallet, if you are using ropsten transfer to your address from this faucet https://faucet.ropsten.be/.
- [x] Update the private key of wallet and project key of infura account in secrets.json (never ever commit the secrets.json file)

How to run

1. Add secrets.json and populate it with keys from infura and wallet private key //{ "ropsten": { "infuraKey": "", "ethAddrprivateKey":""}}
2. Update constants.json with your public key in myEthAddr and your infura URL
3. Run

```shell
 >node index.js --ethEnvt=ropsten --toAcc=0xf880FCd62e27495aA3c9427c4c70A5De66D8d0d2 --sendEth=0.001

```
