// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readFile } from "fs/promises"
import type { NextApiRequest, NextApiResponse } from "next"
import path from "path"
import { getScreenshot } from "./_lib/chromium"
import { getHtml } from "./_lib/getHtml"
import { getCountry } from "./_useCases/getCountry"

const isDev = !process.env.AWS_REGION
const isHtmlDebug = process.env.OG_HTML_DEBUG === "1"

type Data = {
	name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
    const name = String(req.query.name)
    const date = String(req.query.date)
	const country = String(req.query.country)
	const imageUrl = String(req.query.imageUrl)

    if (!name) {
      throw new Error("Name is riquered")
    }
		const { code, flag } = await getCountry(country)

		const html = getHtml(name, date, code, flag, imageUrl)

		if (isHtmlDebug) {
			res.setHeader("Content-Type", "text/html")
			res.end(html)

			return
		}

		const file = await getScreenshot(html, isDev)

		res.statusCode = 200

		res.setHeader("Content-Type", `image/png`)
		// res.setHeader(
		// 	"Cache-Control",
		// 	"public, immutable, no-transform, s-maxage=31536000, max-age=31536000"
		// )

		return res.end(file)
	} catch (err) {
		res.statusCode = 500
		res.setHeader("Content-Type", "text/html")
		res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>")
		console.error(err)
	}
}
