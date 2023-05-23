import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("PaloNFT", function () {
  let _name = "PaloNFT";
  let _symbol = "PNFT";
  let _owner: SignerWithAddress, account1: SignerWithAddress, account2: SignerWithAddress;
  let _paloNFT: any;

  async function deployTokenContract() {
    [_owner, account1, account2] = await ethers.getSigners();

    const PaloNFTFactory = await ethers.getContractFactory("PaloNFT");
    const paloNFT = await PaloNFTFactory.deploy();

    return { paloNFT };
  }

  beforeEach(async () => {
    const { paloNFT } = await loadFixture(deployTokenContract);
    paloNFT.connect(_owner);

    await paloNFT.mintNFT(account1.address, "uri1");
    await paloNFT.mintNFT(account1.address, "uri2");
    await paloNFT.mintNFT(account2.address, "uri3");

    _paloNFT = paloNFT;
  });

  describe("Deployment", function () {
    it("Should have the correct token symbol and name", async function () {
      expect(await _paloNFT.name()).to.equal(_name);
      expect(await _paloNFT.symbol()).to.equal(_symbol);
    });

    it("Should mint a token with token ID 1 & 2 to account1", async function () {
      const address1 = account1.address;
      expect(await _paloNFT.ownerOf(1)).to.equal(address1);
      expect(await _paloNFT.ownerOf(2)).to.equal(address1);
      expect(await _paloNFT.balanceOf(address1)).to.equal(2);
    });

    it("Should mint a token with token ID 3 to account2", async function () {
      const address2 = account2.address;
      expect(await _paloNFT.ownerOf(3)).to.equal(address2);
      expect(await _paloNFT.balanceOf(address2)).to.equal(1);
    });

    it("Should allow owners to transfer tokens", async function () {
      const address1 = account1.address;
      const address2 = account2.address;
      const tokenId = 1;

      // Approve account2 to transfer tokenId owned by account1
      await _paloNFT.connect(account1).approve(address2, tokenId);

      // Transfer tokenId from account1 to account2
      await _paloNFT.connect(account2).transferFrom(address1, address2, tokenId);

      expect(await _paloNFT.ownerOf(tokenId)).to.equal(address2);
      expect(await _paloNFT.balanceOf(address1)).to.equal(1);
      expect(await _paloNFT.balanceOf(address2)).to.equal(2);
    });

    it("Should not allow non-owners to transfer tokens", async function () {
      const address2 = account2.address;
      const tokenId = 1;

      // Ensure that account2 is not approved for transferring the token
      expect(await _paloNFT.getApproved(tokenId)).to.equal(ethers.constants.AddressZero);

      // Attempt to transfer the token from account1 to account2 and expect a revert
      await expect(_paloNFT.connect(account2).transferFrom(account1.address, address2, tokenId)).to.be.revertedWith(
        "ERC721: caller is not token owner or approved"
      );
    });

    it("Should return correct total supply and token by index", async function () {
      const totalSupply = await _paloNFT.totalSupply();
      expect(totalSupply).to.equal(3);

      const token1 = await _paloNFT.tokenByIndex(0);
      expect(token1).to.equal(1);

      const token2 = await _paloNFT.tokenByIndex(1);
      expect(token2).to.equal(2);

      const token3 = await _paloNFT.tokenByIndex(2);
      expect(token3).to.equal(3);
    });

    it("Should return correct token URI", async function () {
      const token1URI = await _paloNFT.tokenURI(1);
      expect(token1URI).to.equal("uri1");

      const token2URI = await _paloNFT.tokenURI(2);
      expect(token2URI).to.equal("uri2");

      const token3URI = await _paloNFT.tokenURI(3);
      expect(token3URI).to.equal("uri3");
    });   

    it("Should support ERC721 and ERC721Enumerable interfaces", async function () {
      expect(await _paloNFT.supportsInterface("0x80ac58cd")).to.equal(true); // ERC721
      expect(await _paloNFT.supportsInterface("0x780e9d63")).to.equal(true); // ERC721Enumerable
    });

    it("Should burn a token and update balances", async function () {
      const address1 = account1.address;
      const tokenId = 1;
    
      // Check the initial balances
      expect(await _paloNFT.balanceOf(address1)).to.equal(2);
    
      // Check that the token exists before burning
      expect(await _paloNFT.ownerOf(tokenId)).to.equal(address1);
    
      // Burn the token
      await _paloNFT.connect(account1).burn(tokenId);
    
      // Check that the token no longer exists
      await expect(_paloNFT.ownerOf(tokenId)).to.be.revertedWith("ERC721: invalid token ID");
    
      // Check the updated balances
      expect(await _paloNFT.balanceOf(address1)).to.equal(1);
    });

  });
});
