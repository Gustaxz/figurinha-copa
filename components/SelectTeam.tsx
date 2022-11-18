import { useEffect, useState } from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { thisApi } from "../assets/api"

interface ITeams {
	name: string
	id: string
}

function SelectTeam({ props }: any) {
	const [teams, setTeams] = useState<ITeams[]>()

	useEffect(() => {
		thisApi.get("/teams").then((e) => setTeams(e.data))
	}, [])

	return (
		<select {...props("team")} className="p-2 outline-none focus:border-qatar-middle-wine border border-transparent rounded-lg w-[50%]">
            <option value="none" >Escolha seu país</option>
			{teams?.map((e) => (
				<option value={e.id} key={e.id}>
					{e.name}
				</option>
			))}
		</select>
	)
}

export { SelectTeam }
