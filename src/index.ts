import { readFile } from "fs";
import { XMLParser } from "fast-xml-parser";

const readXml = () => {
  readFile(process.argv[2], "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const parser = new XMLParser();
    const parsedValue: XmlJson = parser.parse(data);
    console.log(JSON.stringify(parsedValue.root.row));
  });
};
readXml();

type XmlJsonRow = {
  Amount: string;
  Employee: {
    DOB: string;
    DunkinBranch: string;
    DunkinId: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: number;
  };
  Payee: {
    LoanAccountNumber: number;
    PlaidId: string;
  };
  Payor: {
    ABARouting: number;
    AccountNumber: number;
    Address: { City: string; Line1: string; State: string; Zip: number };
    DBA: string;
    EIN: number;
    Name: string;
    DunkinId: string;
  };
};

type XmlJson = { root: { row: XmlJsonRow[] } };
