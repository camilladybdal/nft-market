/* eslint-disable no-undef */
const { assert } = require('chai')

const Color = artifacts.require('./Color.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Color', (accounts) => {
  let contract

  before(async () => {
    contract = await Color.deployed()
  })

  describe('deployement', async () => {
    it('deploys successfully', async () => {
      const address = contract.address
      assert.notEqual(address, undefined)
    })
    it('has name', async () => {
      const name = await contract.name()
      assert.equal(name, 'Color')
    })
    it('has symbol', async () => {
      const symbol = await contract.symbol()
      assert.equal(symbol, 'COLOR')
    })
  })
  describe('minting a token', async () => {
    it('creates a new token', async () => {
      const color = await contract.mint('#FFFFF0')
      const totalSupply = await contract.totalSupply() // IERC721Enumerable

      assert.equal(totalSupply, 1)
      const event = color.logs[0].args
      assert.equal(event.tokenId.toNumber(), 0, 'id is correct')
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
      assert.equal(event.to, accounts[0], 'to is correct')

      await contract.mint('#FFFFF0').should.be.rejected
    })
  })
  describe('indexing', async () => {
    it('lists colors', async () => {
      await contract.mint('#000000')
      await contract.mint('#034HDJ')
      const totalSupply = await contract.totalSupply()

      let color
      const results = []

      for (let i = 1; i <= totalSupply; i++) {
        color = await contract.colors(i - 1)
        results.push(color)
      }
      const expected = ['#FFFFF0', '#000000', '#034HDJ']
      assert.equal(results.join(','), expected.join(','))
    })
  })
})