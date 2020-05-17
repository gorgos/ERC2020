const { expect } = require("chai");
// const waffle = require('ethereum-waffle');

const TWY = value => ethers.utils.parseEther(`${value}`)

describe("ERC2020", function() {
  const [wallet, walletTo] = waffle.provider.getWallets();

  let erc2020;
  let manager2020;

  beforeEach(async () => {
    const ERC2020 = await ethers.getContractFactory("ERC2020");
    const Manager2020 = await ethers.getContractFactory("Manager2020");

    erc2020 = await ERC2020.deploy();
    await erc2020.deployed();
    manager2020 = await Manager2020.deploy(erc2020.address);
    await manager2020.deployed();

    const minterRole = await erc2020.MINTER_ROLE();
    await erc2020.grantRole(minterRole, manager2020.address);
    await manager2020.mint(TWY(4));
  });

  it("sets deployer as admin", async function() {
    const adminRole = await erc2020.DEFAULT_ADMIN_ROLE();
    const isSenderAdmin = await erc2020.hasRole(adminRole, wallet.address);
    
    expect(isSenderAdmin).to.be.true;
  });

  it("sets deployer as admin", async function() {
    await expect(manager2020.transfer(walletTo.address, TWY(5)))
      .to.be.revertedWith('SafeERC20: low-level call failed');

    await manager2020.transfer(walletTo.address, TWY(3));
    
    expect(await erc2020.balanceOf(walletTo.address)).to.equal(TWY(3));
    expect(await erc2020.balanceOf(manager2020.address)).to.equal(TWY(1));
  });
});
