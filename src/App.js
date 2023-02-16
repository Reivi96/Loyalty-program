import { useState, useEffect } from "react";
import { ethers } from "ethers";
import erc20abi from "./ERC20abi.json";

export default function App() {
  const [balanceInfo, setBalanceInfo] = useState({
    address: "-",
    balance: "-"
  });
  //definizione provider di rete e contractAddress di riferimento
  const { JsonRpcProvider } = require("@ethersproject/providers");
  const goerliProviderUrl =
    "https://goerli.infura.io/v3/39e808bc435f475c92682224863598a5"; // sostituisci con il tuo ID progetto Infura
  const provider = new JsonRpcProvider(goerliProviderUrl);
  const contractAddress = "0xe0bC8029a37d42bb1F8910ae5F0D420f423eF37F";

  //inizio const di utilizzo bottoni

  //funzione "visualizza saldo"
  const getBalance = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new JsonRpcProvider(goerliProviderUrl);
    const tokenOwner = data.get("address");
    const erc20 = new ethers.Contract(contractAddress, erc20abi, provider);
    const balance = await erc20.balanceOf(tokenOwner);

    setBalanceInfo({
      address: tokenOwner,
      balance: String(balance)
    });
  };

  //funzione Aggiungi Punti

  const handleMint = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(contractAddress, erc20abi, signer);
    await erc20.mint(data.get("receiver"), data.get("amount"));
  };

  //funzione Rimuovi Punti

  const handleRemove = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(contractAddress, erc20abi, signer);
    await erc20.removeFromAddress(data.get("_to"), data.get("_value"));
  };

  return (
    <div
      className="grid grid-cols-1 gap-2 md:grid-cols-3"
      style={{ marginTop: "150px" }}
    >
      <div style={{ position: "absolute", top: 30, left: 180 }}>
        <img src="Raggruppa186.png" />
      </div>

      <div>
        <h1 className="text-xl font-semibold text-gray-700 text-center">
          Visualizza Saldo
        </h1>
        <div>
          <form onSubmit={getBalance}>
            <div className="my-3">
              <input
                type="text"
                name="address"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Indirizzo Cliente"
              />
            </div>

            <footer className="p-4">
              <button
                type="submit"
                className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
              >
                Visualizza Saldo
              </button>
            </footer>

            <div className="px-4">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Address</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{balanceInfo.address}</th>
                      <td>{balanceInfo.balance}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-semibold text-gray-700 text-center">
          Aggiungi WebiPoint
        </h1>
        <form onSubmit={handleMint}>
          <div className="my-3">
            <input
              type="text"
              name="receiver"
              className="input input-bordered block w-full focus:ring focus:outline-none"
              placeholder="Indirizzo Cliente"
            />
          </div>
          <div className="my-3">
            <input
              type="text"
              name="amount"
              className="input input-bordered block w-full focus:ring focus:outline-none"
              placeholder="Webipoints da Aggiungere"
            />
          </div>

          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              Aggiungi
            </button>
          </footer>
        </form>
      </div>

      <div>
        <h1 className="text-xl font-semibold text-gray-700 text-center">
          Rimuovi WebiPoint
        </h1>

        <form onSubmit={handleRemove}>
          <div className="my-3">
            <input
              type="text"
              name="_to"
              className="input input-bordered block w-full focus:ring focus:outline-none"
              placeholder="Indirizzo Cliente"
            />
          </div>
          <div className="my-3">
            <input
              type="text"
              name="_value"
              className="input input-bordered block w-full focus:ring focus:outline-none"
              placeholder="Webipoints da Rimuovere"
            />
          </div>
          <footer className="p-4">
            <button
              type="submit"
              className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
            >
              Rimuovi
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
