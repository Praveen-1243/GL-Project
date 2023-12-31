export const organizationAbi=[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_mintAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "tokenId",
				"type": "uint8"
			}
		],
		"name": "validateTransacript",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "_studentId",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "details",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_marks",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


export const organizationContractAddress = "0xef9c17D9046c6b6a408a6c6590Bb814898e36C5d";

export default {
    organizationAbi,
	organizationContractAddress 
}
