import { readFile } from "fs";
import { XMLParser } from "fast-xml-parser";

const readXml = () => {
  readFile(process.argv[2], "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const parser = new XMLParser();
    const parsedValue = parser.parse(data);
    console.log(JSON.stringify(parsedValue));
  });
};
readXml();
