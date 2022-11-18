import { NextApiRequest, NextApiResponse } from "next";
import { allCupTeams } from "../../../assets/cupData/allTeams";

export default function teamsRoute(req: NextApiRequest, res: NextApiResponse) {

    return res.json(allCupTeams)
}