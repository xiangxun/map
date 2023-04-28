// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { colorType2 } from "@/assets";
import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };
type ColorType = {
  [key: string]: {
    color: string;
    opacity: number;
  };
};

const colorType: ColorType = colorType2;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ColorType>
) {
  res.status(200).json(colorType);
}
