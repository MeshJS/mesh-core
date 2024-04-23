import { scriptHashToBech32, serializeBech32Address } from '../../src';

describe('Address', () => {
    test('serializeBech32Address', () => {
        const address =
            'addr_test1qqmrzjhtanauj20wg37uk58adyrqfm82a9qr52vdnv0e54r42v0mu8ngky0f5yxmh3wl3z0da2fryk59kavth0u8xhvsufgmc8';
        const serializedAddress = serializeBech32Address(address);
        expect(serializedAddress.pubKeyHash).toBe(
            '36314aebecfbc929ee447dcb50fd690604eceae9403a298d9b1f9a54',
        );
        expect(serializedAddress.scriptHash).toBe('');
        expect(serializedAddress.stakeCredential).toBe(
            '75531fbe1e68b11e9a10dbbc5df889edea92325a85b758bbbf8735d9',
        );
    });
    test('scriptHashToBech32', () => {
        const scriptHash = '0049d04cc313681a8390d5ed0484b6803c76d80cd97e71df8e4e5f3a';
        const stakeHash = 'bfaa385c8eab7bbdc6c98b50413435b3d02b73de3c644e1384b801d4';
        const serializedAddress = scriptHashToBech32(scriptHash, stakeHash);
        expect(serializedAddress).toBe(
            'addr_test1zqqyn5zvcvfksx5rjr276pyyk6qrcakcpnvhuuwl3e897w4l4gu9er4t0w7udjvt2pqngddn6q4h8h3uv38p8p9cq82q7xtsrh',
        );
    });
});
