import { Gloock, Hanken_Grotesk, Noto_Sans_Lao_Looped, Noto_Serif_Lao } from "next/font/google";

const gloock = Gloock({ weight: "400", subsets: ["latin"], variable: "--font-gloock" });
const serifLao = Noto_Serif_Lao({ subsets: ["lao"], variable: "--font-serif-lao" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken" });
const sansLao = Noto_Sans_Lao_Looped({ subsets: ["lao"], variable: "--font-sans-lao" });

export const fontVariables = [gloock, serifLao, hanken, sansLao].map((f) => f.variable).join(" ");
