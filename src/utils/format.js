import { utils } from "ethers";

export const getEtherFrom = (wei) => {
    // const weiString = BigNumber.from(wei).toString();
    return utils.formatEther(wei);
}
