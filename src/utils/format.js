import { ethers } from "ethers";

export const getEtherFrom = (wei) => {
    // const weiString = BigNumber.from(wei).toString();
    return ethers.utils.formatEther(wei);
}
