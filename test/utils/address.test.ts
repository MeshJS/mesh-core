import { serializeBech32Address } from '../../src';

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
});
