export const studentAbi=[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_regularAddr",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_collegeAdress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_privAddress",
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
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"name": "SampleMSG",
		"type": "event"
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
				"internalType": "string",
				"name": "_courseName",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_studentId",
				"type": "uint8"
			}
		],
		"name": "enrollAtprivateEntity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_courseName",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_studentId",
				"type": "uint8"
			}
		],
		"name": "enrollTocourses",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "generatePrivateEntityTransacript",
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
				"name": "_collegeName",
				"type": "string"
			}
		],
		"name": "getCollegeId",
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
		"name": "getCollegeStudentId",
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
		"name": "getCourses",
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
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPrivateEntities",
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
		"name": "getPrivateEntityCourses",
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
				"internalType": "string",
				"name": "_privateName",
				"type": "string"
			}
		],
		"name": "getPrivateEntityId",
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
		"name": "getPrivateStudentId",
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
		"name": "getTransacript",
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
				"internalType": "address",
				"name": "_studentAddr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_studentName",
				"type": "string"
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
		"name": "registerToCollege",
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
				"internalType": "string",
				"name": "_studentName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_privateName",
				"type": "string"
			}
		],
		"name": "registerToPrivateEntity",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export const studentContractAddress = "0x8cd877a18C3264E14328441079339b6355619471";

export default {
    studentAbi,
	studentContractAddress 
}
