import saveAs from "file-saver"

import { AiOutlineCloudDownload } from "react-icons/ai"
import { ImSpinner9 } from "react-icons/im"

interface IDownloadButton {
    loadingImage: boolean
	imageUrl: string
}

function DownloadButton({ loadingImage, imageUrl }: IDownloadButton) {
    function handleDownload() {
		saveAs(
			imageUrl,
			"figurinha.png"
		)
	}

	return (
		<button
			onClick={handleDownload}
			className="h-12 w-48 bg-green-500 text-white font-bold rounded-xl flex gap-2 justify-center items-center hover:opacity-90"
			disabled={loadingImage}
		>
			{loadingImage ? (
				<ImSpinner9 size={32} className="animate-spin" />
			) : (
				<>
					<p>Download</p>
					<AiOutlineCloudDownload size={32} />
				</>
			)}
		</button>
	)
}

export { DownloadButton }
