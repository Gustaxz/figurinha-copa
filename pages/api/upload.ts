import { NextApiRequest, NextApiResponse } from "next"

import nextConnect from "next-connect"
import multer from "multer"

import { limitFiles } from "./_useCases/upload/uploadFile"

const upload = multer({
	storage: multer.diskStorage({
		destination: './public/uploads',
		filename: (req, file, cb) => {
            cb(null, file.originalname)
        },
	}),
})

const apiRoute = nextConnect({
	onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
		console.log(error)
		res.status(501).json({ error: `Sorry something Happened! ${error.message}` })
	},
	onNoMatch(req, res) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
	},
})

apiRoute.use(upload.single("theFiles"))

apiRoute.post(async (req, res) => {
    await limitFiles(String(req.query.file))
	res.status(200).json({ data: "success" })
})

export default apiRoute

export const config = {
	api: {
		bodyParser: false,
	},
}
