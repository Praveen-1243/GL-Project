export const regularBoardAbi=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "sampleMsg",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "boardDataExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "boardList",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "boardId",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "boardName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBoardList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint8",
						"name": "boardId",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "boardName",
						"type": "string"
					}
				],
				"internalType": "struct RegularInterface.BoardInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCollegeList",
		"outputs": [
			{
				"internalType": "uint8[]",
				"name": "_collegeList",
				"type": "uint8[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_boardname",
				"type": "string"
			}
		],
		"name": "registerBoard",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_collegeId",
				"type": "uint8"
			}
		],
		"name": "setCollege",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
export const regularBoardContractAddress = "0xec266b559E10bA8C142D0F4A8a9f33f6469A3FD6";

export default {
    regularBoardAbi,
	regularBoardContractAddress 
}