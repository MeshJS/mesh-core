/* eslint-disable radix */
export type Unit = string;

export type Quantity = string;

export type Asset = {
    unit: Unit;
    quantity: Quantity;
};

export const mergeAssets = (assets: Asset[]): Asset[] => {
    const merged: Asset[] = [];
    assets.forEach((asset) => {
        const existing = merged.find((a) => a.unit === asset.unit);
        if (existing) {
            existing.quantity = (parseInt(existing.quantity) + parseInt(asset.quantity)).toString();
        } else {
            merged.push(asset);
        }
    });
    return merged;
};
