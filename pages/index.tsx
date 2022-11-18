import { useState } from "react"

import Image from "next/image"

import { nanoid } from "nanoid"

import "react-toastify/dist/ReactToastify.css"
import 'animate.css';

import { thisApi } from "../assets/api"

import { DownloadButton } from "../components/DownloadButton"
import { SubmitHandler, useForm } from "react-hook-form"

import { BiAddToQueue } from "react-icons/bi"
import { AiFillFileImage } from "react-icons/ai"
import { ImSpinner9 } from "react-icons/im"


import { SelectTeam } from "../components/SelectTeam"
import { toast, ToastContainer, cssTransition } from "react-toastify"

interface IFormFields {
	date: string
	imageFile: File[]
	name: string
	team: string
}

export default function Home() {
	const { handleSubmit, register, resetField, watch, trigger } = useForm<IFormFields>()

	const [selectedImage, setSelectedImage] = useState<File>()
	const [loadingImage, setLoadingImage] = useState(false)
	const [imageUrl, setImageUrl] = useState<string>(
		`${process.env.NEXT_PUBLIC_BASE_PATH}/api/card.png?name=Neymar JR&date=05-02-1992&country=brazil&imageUrl=${process.env.NEXT_PUBLIC_BASE_PATH}/ney.webp`
	)

	const shake = cssTransition({
		enter: "animate__animated animate__bounceIn",
		exit: "animate__animated animate__bounceOutLeft"
	})

	async function handleUpload(imageFile: File, data: IFormFields) {
		try {
			if (imageFile) {
				const imageId = nanoid(10)
				const imageName = imageFile.name.substring(0, imageFile.name.indexOf("."))
				const imageExtension = imageFile.name.substring(imageFile.name.indexOf(".") + 1)
				const imageNameWithId = `${imageName}-${imageId}.${imageExtension}`

				const formData = new FormData()
				formData.append("theFiles", imageFile, imageNameWithId)

				const config = {
					headers: { "Content-Type": "multipart/form-data" },
					onUploadProgress: (event: any) => {
						console.log(
							`Current progress:`,
							Math.round((event.loaded * 100) / event.total)
						)
					},
				}

				await thisApi.post(`/upload?file=${imageNameWithId}`, formData, config)
				setImageUrl(
					`${process.env.NEXT_PUBLIC_BASE_PATH}/api/card.png?name=${data.name}&date=${data.date}&country=${data.team}&imageUrl=${process.env.NEXT_PUBLIC_BASE_PATH}/uploads/${imageNameWithId}`
				)
				setLoadingImage(true)
				toast("🎉 Criando figurinha!", {
					position: "top-left",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					transition: shake
				})
			}
		} catch (err) {
			console.log("error", err)
			toast.error("Algo deu errado!", {
				position: "top-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			})
		}
	}

	const onSubmit: SubmitHandler<IFormFields> = async (data) => {
		const fieldNull = Object.keys(data).map((e) => data[e] === "" || data[e] === "none")

		console.log(selectedImage)

		if (fieldNull.includes(true) || !selectedImage) {
			toast.warn("Preencha todos os campos!", {
				position: "top-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition: shake
			})
		} else {
			if (selectedImage) {
				await handleUpload(selectedImage, data)
			}
		}
	}

	return (
		<>
			<ToastContainer
				position="top-left"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={shake}
			/>
			<div className="h-screen w-screen bg-back-animated bg-cover bg-no-repeat font-roboto">
				<div className="sm:grid grid-cols-2 h-screen py-4 sm:py-0 flex flex-col gap-11">
					<div className="flex justify-center flex-col items-center">
						<p className="text-center font-bold text-qatar-wine text-4xl max-w-[60%]">
							Escolha sua figurinha personalizada!
						</p>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col gap-[5vh] mt-[5vh] items-center w-full"
						>
							<input
								type="text"
								placeholder="Seu nome"
								className="p-2 w-[50%] outline-none rounded-lg transition-colors border border-transparent focus:border-qatar-middle-wine"
								{...register("name")}
							/>
							<input
								type="text"
								placeholder="Sua data de nascimento"
								className="p-2 w-[50%] outline-none rounded-lg transition-colors border border-transparent focus:border-qatar-middle-wine"
								{...register("date")}
							/>
							<SelectTeam props={register} />
							<div className="w-[50%] flex flex-col gap-2">
								<label
									htmlFor="imageFile"
									className="flex flex-col gap-2 items-center border-qatar-middle-wine border-dotted border-2 font-bold p-3 cursor-pointer"
								>
									<AiFillFileImage size={40} />
									<p>
										{selectedImage
											? selectedImage.name
											: "Clique ou solte uma imagem aqui"}
									</p>
								</label>
								<p
									className={`font-bold cursor-pointer hover:text-qatar-middle-wine transition-colors ${
										!selectedImage ? "hidden" : null
									}`}
									onClick={() => {
										resetField("imageFile")
										setSelectedImage(undefined)
									}}
								>
									Remover imagem
								</p>
							</div>
							<input
								type="file"
								{...register("imageFile", {
									onChange(event) {
										setSelectedImage(event.target.files[0])
									},
								})}
								id="imageFile"
								className="hidden"
								accept="image/*"
							/>
							<button
								type="submit"
								className="bg-qatar-middle-wine hover:opacity-90 text-white w-48 h-12 rounded-lg flex gap-2 items-center justify-center font-bold"
								disabled={loadingImage}
							>
								{loadingImage ? (
									<ImSpinner9 size={32} className="animate-spin" />
								) : (
									<>
										<p>Criar figurinha</p>
										<BiAddToQueue size={32} />
									</>
								)}
							</button>
						</form>
					</div>
					<div className="flex flex-col items-center gap-4 justify-center">
						<Image
							src={imageUrl}
							alt="preview da figurinha"
							width={360}
							height={480}
							style={{ objectFit: "contain", maxHeight: "480px", maxWidth: "360px" }}
							quality={100}
							className="ring-offset-4 ring-2 animate__animated animate__jackInTheBox"
							sizes="32"
							onLoad={(e) => setLoadingImage(false)}
							onChange={(e) => console.log("change", e)}
						/>
						<DownloadButton loadingImage={loadingImage} imageUrl={imageUrl} />
						<div className="h-8 sm:hidden"></div>
					</div>
				</div>
			</div>
		</>
	)
}
