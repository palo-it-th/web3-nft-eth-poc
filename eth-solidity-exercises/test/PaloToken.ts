import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";


describe("PaloToken", function () {

    async function deployTokenContract() {
        const maxSupply = 100;

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const PaloTokenFactory = await ethers.getContractFactory("PaloToken");
        const paloToken = await PaloTokenFactory.deploy(owner.getAddress(), maxSupply);

        return { paloToken, maxSupply, owner, otherAccount };
    }

    async function deployTokenContractAndMint() {
        const maxSupply = 100;

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const PaloTokenFactory = await ethers.getContractFactory("PaloToken");
        const paloToken = await PaloTokenFactory.deploy(owner.getAddress(), maxSupply);
        const mintedAmount = 15;
        await paloToken.mint(owner.address, mintedAmount);

        return { paloToken, maxSupply, owner, otherAccount };
    }

    describe("Deployment", function () {
        it("Should set the right maximum supply", async function () {
            const { paloToken, maxSupply } = await loadFixture(deployTokenContract);

            expect(await paloToken.maximumSupply()).to.equal(maxSupply);
        });

        it("Should set the right owner", async function () {
            const { paloToken, owner } = await loadFixture(deployTokenContract);

            expect(await paloToken.owner()).to.equal(owner.address);
        });
    });

    describe("Mint", function () {
        describe("Validations", function () {
            it("Only owner can mint token", async function () {
                const { owner, otherAccount, paloToken, maxSupply } = await loadFixture(deployTokenContract);

                await expect(paloToken.connect(otherAccount).mint(otherAccount.address, 10)).to.be.revertedWith(
                    "Only the owner can mint tokens!"
                );

            });

            it("Can not mint over maximum supply", async function () {
                const { owner, otherAccount, paloToken, maxSupply } = await loadFixture(deployTokenContract);

                await expect(paloToken.mint(otherAccount.address, 101)).to.be.revertedWith(
                    "Maximum supply cap has been reached!"
                );
            });
        });

        describe("Events", function () {
            it("Event emitted on token mint", async function () {
                const { otherAccount, paloToken } = await loadFixture(deployTokenContract);
                const amount = 10;

                await expect(paloToken.mint(otherAccount.address, amount)).to.emit(paloToken, "Mint").withArgs(
                    otherAccount.address, amount, anyValue
                );

            });
        });
    });

    describe("Transfer", function () {
        describe("Logic", function () {
            it("Transfer successful", async function () {
                const { owner, otherAccount, paloToken, maxSupply } = await loadFixture(deployTokenContractAndMint);
                const transferAmount = 10;

                expect(await paloToken.transfer(owner.address, otherAccount.address, transferAmount)).to.be.ok;
                expect(await paloToken.balance(otherAccount.address)).to.equal(10);
                expect(await paloToken.balance(owner.address)).to.equal(5);

            });
        });

        describe("Validations", function () {
            it("Only owner can mint token", async function () {
                const { owner, otherAccount, paloToken, maxSupply } = await loadFixture(deployTokenContractAndMint);
                const transferAmount = 1000;

                await expect(paloToken.transfer(owner.address, otherAccount.address, transferAmount)).to.be.revertedWith(
                    "You don't have sufficient funds!"
                );
            });

            it("Only owner can mint token", async function () {
                const { owner, otherAccount, paloToken, maxSupply } = await loadFixture(deployTokenContractAndMint);
                const transferAmount = 10;

                await expect(await paloToken.transfer(owner.address, otherAccount.address, transferAmount)).to.emit(paloToken, "Transfer").withArgs(
                    owner.address, otherAccount.address, transferAmount, anyValue
                );
            });
        });
    })

});