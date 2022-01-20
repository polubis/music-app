import { ChordSymbol } from "../models";
import { Typography } from "antd";

import css from "./ChordInScaleSymbol.module.less";

const { Title } = Typography;

interface ChordInScaleSymbolProps {
  symbol: ChordSymbol;
  value: number;
}

const ROMAN_SMALL_NUMBERS = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];
const ROMAN_BIG_NUMBERS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

const pickNumbers = (symbol: ChordSymbol): string[] => {
  if (symbol === "major") {
    return ROMAN_BIG_NUMBERS;
  }

  if (symbol === "minor") {
    return ROMAN_SMALL_NUMBERS;
  }

  if (symbol === "°") {
    return ROMAN_SMALL_NUMBERS.map((nmb) => nmb + "°");
  }

  if (symbol === "+") {
    return ROMAN_SMALL_NUMBERS.map((nmb) => nmb + "+");
  }

  throw new Error("pickNumbers() [SYMBOL_NOT_FOUND]");
};

const ChordInScaleSymbol = ({ symbol, value }: ChordInScaleSymbolProps) => {
  return (
    <Title className={css.title} level={3}>
      {pickNumbers(symbol)[value]}
    </Title>
  );
};

export { ChordInScaleSymbol };
