export const privateEntityAbi=[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_mintAddr",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "CourseDetails",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "courseId",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "courseName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_courseName",
				"type": "string"
			}
		],
		"name": "addCourse",
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
				"name": "_studentId",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_courseId",
				"type": "uint8"
			}
		],
		"name": "addMarks",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "_courseId",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_studentId",
				"type": "uint8"
			}
		],
		"name": "enrollCourse",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "_studentId",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_studentName",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_courseId",
				"type": "uint8"
			}
		],
		"name": "generateTransacript",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getEntityList",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint8",
						"name": "privateId",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "privateName",
						"type": "string"
					}
				],
				"internalType": "struct IPrivateEntity.PrivEntityInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "listCoures",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint8",
						"name": "courseId",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "courseName",
						"type": "string"
					}
				],
				"internalType": "struct IPrivateEntity.Course[]",
				"name": "_courseList",
				"type": "tuple[]"
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
		"name": "privEntityList",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "privateId",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "privateName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_privname",
				"type": "string"
			}
		],
		"name": "registerPrivateEntity",
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
				"name": "_studentId",
				"type": "uint8"
			}
		],
		"name": "setStudent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
export const privateEntityContractAddress = "0x237853bB40225d4bB1125339f8539166F67B492d";

export default {
    privateEntityAbi,
	privateEntityContractAddress 
}
