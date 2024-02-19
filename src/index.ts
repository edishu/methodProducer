import { readFile } from "fs";
import { XMLParser } from "fast-xml-parser";
import { Kafka } from "kafkajs";

const readXml = () => {
  readFile(process.argv[2], "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const parser = new XMLParser();
    const parsedValue: XmlJson = parser.parse(data);
    sendMessageToKafka(JSON.stringify(parsedValue.root.row));
  });
};
readXml();

async function sendMessageToKafka(msg: string) {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["localhost:9092"],
    });

    const producer = kafka.producer();

    // Connect
    console.log("Connecting...");
    await producer.connect();
    console.log("Connected!");

    const result = await producer.send({
      topic: "test",
      messages: [{ value: msg }],
    });

    // Disconnect
    await producer.disconnect();
  } catch (e) {
    console.error(`Error: ${e}`);
  } finally {
    process.exit();
  }
}

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
