import React, { useEffect, useState } from "react";
import Web3 from "web3";
import * as S from "./styles";
import Color from "../artifacts/contracts/Color.sol/Color.json";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { coloraddress } from "../config";

const CreateColorToken = () => {
  const [contract, setContract] = useState<any>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [inputColor, setInputColor] = useState("");

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.eth_requestAccounts;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "A non Ethereum browser is being used. Consider downloading MetaMask chrome extension!"
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    /* User must be able to sign and execute transaction */
    const signer = provider.getSigner();
    const contract = new ethers.Contract(coloraddress, Color.abi, signer);

    setContract(contract);

    const amount = await contract.getCounter();
    for(let i = 1; i <= amount._hex; i++) {
      const color = await contract.colors(i);
      setColors((prev) => [...prev, color]);
    }
  };

  /* Call the smart-contract mint-function */
  const mint = async (color: string) => {
    try {
      const res = await contract.mint(color);
      console.log(res);
      setColors((prev) => [...prev, color]);
    } catch (e: any) {
      console.log(e);
    }
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setInputColor(e.currentTarget.value);
  };

  const runAsyncLoad = async () => {
    await loadWeb3();
    await loadBlockchainData();
  };

  useEffect(() => {
    runAsyncLoad();
  }, []);

  return (
    <S.Wrapper>
      
      <S.CreateToken>
        <h1> Create Color Token </h1>
        <p> Just for fun! These only cost gas. </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            mint(inputColor);
          }}
        >
          <input
            type="text"
            placeholder="e.g. #FFFFFF"
            value={inputColor}
            onChange={onChange}
          />

          <S.SubmitBtn type="submit" value="Create Token" />
        </form>
      </S.CreateToken>

      <S.Color>
        {colors.map((color: string, index: number) => {
          return (
            <div key={index}>
              <S.ColorContainer bgcolor={color}></S.ColorContainer>
              <p>{color}</p>
            </div>
          );
        })}
      </S.Color>
    </S.Wrapper>
  );
};

export default CreateColorToken;
