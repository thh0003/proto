# Parse a custom protocol format

A payment processing application that interfaces with an old-school mainframe format that named "MPS7".
This means consuming a proprietary binary protocol format that no one is familiar with yet.

Solution:
1) Creates an instance of the protoParser Class by calling "new protoP(<PATH TO THE DATA FILE>);"
   a) The class creates an object called "protoData" which holds the current "State" of the application holds the following information:
      (1) Magic - Binary file format
      (2) Version - Format Version
      (3) Records - Number of Records
      (4) totalCredit - Total of all credit transactions
      (5) totalDebit - Total of all Debit Transactions
      (6) autopayStarts - total number of autopay starts
      (7) autopayEnds - total number of autopay ends
      (8) fsPath- path to the datafile
      (9) fsCurLoc - current position in the buffer
      (10) payload - An array of all the transactions in the file
      (11) rawData - Buffer of the raw binary data
      (12) account - Hash table of the user accounts which holds the user's balance and autopay setting
2) Loads the binary data file into a buffer by calling "protoparser.loadFile();"
3) Parses the header of the data file from the buffer by calling "protoparser.parseHeader();"
   a) Verifing the format (MPS7), Version (1), and Number of Records (71)
4) Parses the data of the binaryfile from the buffer by calling "protoparser.parseData();"
   a) Parses thru the Buffer based on the specifications for each record and the number of records specified in the Header (fyi there where 72 total records in the file, but only 71 was specified in the header)
   b) For each record it:
      (1)  updates the User's Account by calling updateAccount (type, user, amount)
      (2)  Totals for the file by calling updateTotals (type, amount)
      (3)  enters each record into the "payload" array for future use
   c) This takes linear time O(n)
5) Displays the request information for the assignment by calling "protoparser.displayTotals();"

Additional Functionality:
1) Getters and Setters for the protoData object attributes
2) userBalance (user) - takes a user id and returns the user's balance
3) displayAllAccounts() - display's all user accounts to the console

Refactoring Ideas and Reusability Ideas:
1) Adding reusability configuration settings in the .env or a configuration file which would allow the parser to be used for any binary data
   a) Header specifications - Set the name, version, records
   b) Record specifications - specifiy the size, type, of each field in the records



I have written the assignment using Javascript and Node.  To run the code follow the below steps:
1) Install Node - Goto https://nodejs.org/en/download/ and download the appropriate version
2) Unzip the source code into an empty directory
3) Open a terminal
4) Change Directory in to the source code directory
5) enter 'npm install' (This will install the necessary dependencies)
6) To run the code enter 'node proto.js'
7) To run the test cases enter 'npm test'

Configuration Note:
1) In the file '.env' specify the location of the 'txnlog.dat' file.  Right now it located in the project root.
2) Also specify the endianess of the data file
