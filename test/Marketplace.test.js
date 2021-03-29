const { assert } = require("chai")

require('chai')
    .use(require('chai-as-promised'))
    .should()

const Marketplace = artifacts.require("Marketplace")

contract('Marketplace', ([deployer, seller, buyer]) => {
    let marketplace

    before(async () => {
        marketplace = await Marketplace.deployed()
    })

    // deployment

    describe('deployment', async() => {
        it('deploys succesfully', async() => {
            const address = await marketplace.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('it has a name', async() => {
        const name = await marketplace.name()
        assert.equal(name, 'Dapp University Marketplace')
        })
    })

    // products

    describe('products', async() => {
        let result, productCount

        before(async () => {
            result = await marketplace.createProduct('iPhone X', web3.utils.toWei('1', 'Ether'), { from: seller })
            productCount = await marketplace.productCount()
        })

        it('creates products', async() => {
            // SUCCESS
            assert.equal(productCount, 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'iPhone X', 'name is correct')
            assert.equal(event.price, '1000000000000000000', 'price is correct')
            assert.equal(event.owner, seller, 'owner is correct')
            assert.equal(event.purchased, false, 'purchased is correct')

            // FAILURE: Product must have a name
            await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;

            // FAILURE: Product must have a price
            await marketplace.createProduct('iPhone X', 0, { from: seller }).should.be.rejected;
        
        })
    })

})