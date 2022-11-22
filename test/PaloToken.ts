import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";


describe("PaloNFT", function () {

    let _name='PaloNFT';
    let _symbol='PNFT';
    let owner: SignerWithAddress, account1: SignerWithAddress, otherAccounts: SignerWithAddress[];

    async function deployTokenContract() {
        // Contracts are deployed using the first signer/account by default
        [owner, account1, ...otherAccounts] = await ethers.getSigners();

        const PaloNFTFactory = await ethers.getContractFactory("PaloNFT");
        const paloNFT = await PaloNFTFactory.deploy();

        return { paloNFT};
    }

    describe("Deployment", function () {
        it("Should have the correct token symbol and name", async function () {
            const { paloNFT } = await loadFixture(deployTokenContract);

            expect(await paloNFT.name()).to.equal(_name);
            expect(await paloNFT.symbol()).to.equal(_symbol);
        });

        it("Should mint a token with token ID 1 & 2 to account1", async function () {
            const { paloNFT } = await loadFixture(deployTokenContract);

            const address1 = account1.address;
            await paloNFT.mintNFT(address1, "uri1");
            expect(await paloNFT.ownerOf(1)).to.equal(address1);
      
            await paloNFT.mintNFT(address1, "uri2");
            expect(await paloNFT.ownerOf(2)).to.equal(address1);
      
            expect(await paloNFT.balanceOf(address1)).to.equal(2);      
          });
    });

});