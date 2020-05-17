const bre = require("@nomiclabs/buidler");

async function main() {
  const ERC2020 = await ethers.getContractFactory("ERC2020");
  const Manager2020 = await ethers.getContractFactory("Manager2020");

  const erc2020 = await ERC2020.deploy();
  await erc2020.deployed();
  const manager2020 = await Manager2020.deploy(erc2020.address);
  await manager2020.deployed();

  console.log("ERC2020 deployed to:", erc2020.address);
  console.log("Manager2020 deployed to:", manager2020.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
