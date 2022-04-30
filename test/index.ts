import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { utils } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { MananCoin } from "../typechain/MananCoin";

let Coin: MananCoin = null as any;
let accounts: SignerWithAddress[] = [];

const initiateAccounts = async () => {
  const accounts = await ethers.getSigners();
  return accounts;
};

describe("Manan Coin Test", async () => {
  before(async () => {
    accounts = await initiateAccounts();
    const MANANCOIN = await ethers.getContractFactory("MananCoin");
    Coin = await MANANCOIN.deploy();
    await Coin.deployed();
  });
  it("deployer must have manancoin 20_000_000_000", async () => {
    const owner = accounts[0];
    const balance = await Coin.connect(owner).balanceOf(owner.address);
    expect(balance.toString()).to.eq(String(20_000_000_000 * 1e9));
  });
  it("should transfer 10_000", async () => {
    const owner = accounts[0];
    const to = accounts[1];
    const amount = parseUnits("10000", 9);
    const tx = await Coin.connect(owner).transfer(to.address, amount);
    const receipt = await tx.wait();
    expect(receipt.status).to.eq(1);
  });
  it("should have balance 10000", async () => {
    const accounst2 = accounts[1];
    const balance = await Coin.connect(accounst2).balanceOf(accounst2.address);
    expect(balance.toString()).to.eq(String(10_000 * 1e9));
  });
});
