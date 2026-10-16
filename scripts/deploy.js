
import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  // Utilisation d un RPC Sepolia public ultra-stable et sans clé API
  const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
  
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("PRIVATE_KEY introuvable dans le fichier .env");
  }

  const wallet = new ethers.Wallet(privateKey, provider);
  
  console.log("Déploiement du contrat EternalVows sur Sepolia avec l adresse :", wallet.address);

  const artifact = JSON.parse(fs.readFileSync("./artifacts/contracts/EternalVows.sol/EternalVows.json", "utf8"));
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  
  console.log("Envoi de la transaction de déploiement...");
  const contract = await factory.deploy();
  await contract.waitForDeployment();
  
  const address = await contract.getAddress();
  console.log("?? CONTRACT_ADDRESS=" + address);
}

main().catch((error) => {
  console.error("Erreur lors du déploiement :", error);
  process.exit(1);
});

