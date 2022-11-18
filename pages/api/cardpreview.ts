import { NextApiRequest, NextApiResponse } from "next";

import { readFile } from "fs/promises"

// const isDev = !process.env.AWS_REGION
const isDev = true

export default async function cardpreview(req: NextApiRequest, res: NextApiResponse) {

    if (!isDev) {
        return res.status(404).send("acesss only for development")
    }

    try {
        const html = await readFile("./public/_models/index.html")

        res.setHeader("Content-Type", "text/html")
        return res.end(html)
    } catch (err) {
        console.error(err)
        throw err
    }
}