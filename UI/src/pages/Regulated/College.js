export const collegeAbi=[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_regular",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_mint",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Datalog",
		"type": "event"
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "collegesList",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "collegeId",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "collegeName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "displayBoards",
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
		"inputs": [
			{
				"internalType": "string",
				"name": "_boardName",
				"type": "string"
			}
		],
		"name": "getBoardId",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getColleges",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint8",
						"name": "collegeId",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "collegeName",
						"type": "string"
					}
				],
				"internalType": "struct ICollegeContract.CollegeInfo[]",
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
				"internalType": "struct ICollegeContract.Course[]",
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
				"internalType": "address",
				"name": "_clgAddr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_collegeName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_boardName",
				"type": "string"
			}
		],
		"name": "registerCollege",
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
				"name": "college",
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


export const collegeContractAddress = "0xd9E73b5968E67eeBDc588B8aa950c5Bb2307c5F1";

export default {
    collegeAbi,
	collegeContractAddress 
}