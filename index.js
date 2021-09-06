const Web3 = require("web3");
const utils = require("./utils");
const Tx = require("ethereumjs-tx").Transaction;
// {
//   "ropsten": {
//     "infura": "",
//     "ethAddrprivateKey":""
//   }
// }
const secrets = require("./secrets.json");
const constants = require("./constants.json");
const cliArgs = utils.extractCliArgs();

const ethEnvt = cliArgs?.ethEnvt;
const toETHAccount = cliArgs?.toAcc;
const sendEth = cliArgs?.sendEth;

if (!ethEnvt || !toETHAccount || !sendEth) {
  console.log(
    "Env or to ETHAccount not provided eg -> --ethEnvt=ropsten --toAcc=0x.....3a --sendEth=0.01"
  );
  return;
}

const rpcURL = constants?.[ethEnvt]?.infuraURL;
const infuraKey = secrets?.[ethEnvt]?.infuraKey;
const myEthAddr = constants?.[ethEnvt]?.myEthAddr;
const pkHexBuffer = Buffer.from(secrets?.[ethEnvt]?.ethAddrprivateKey, "hex");

if (!rpcURL || !infuraKey || !myEthAddr) {
  console.log("Key or URL 0r Addr not found for ethEnvt");
  return;
}
console.log(ethEnvt, " ETH Account: ", myEthAddr);
const web3 = new Web3(rpcURL);

web3.eth.getTransactionCount(myEthAddr).then((txCount) => {
  console.log("Total TXNs for account: ", txCount);
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: toETHAccount,
    value: web3.utils.toHex(web3.utils.toWei(sendEth, "ether")),
    gasLimit: web3.utils.toHex(2),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
  };

  const tx = new Tx(txObject, { chain: ethEnvt });
  tx.sign(pkHexBuffer);
  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash:", txHash, "err: ", err);
    web3.eth.getBalance(myEthAddr, (err, wei) => {
      balance = web3.utils.fromWei(wei, "ether");
      console.log("New ETH Balance", balance);
    });
  });
});

web3.eth
  .getGasPrice()
  .then((result) =>
    console.log("Gas Price: " + web3.utils.fromWei(result, "gwei"), "gwei")
  );
