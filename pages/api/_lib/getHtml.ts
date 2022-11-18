const basePath = process.env.NEXT_PUBLIC_BASE_PATH

export function getHtml(name: string, date: string, code: string, flag: string, imageUrl: string) {
	return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Figurinha</title>
    
            <style>
			@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

			* {
				padding: 0;
				margin: 0;
			}

			.container {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100vh;
			}

			.card {
				height: 480px;
				width: 360px;
				background-image: linear-gradient(to bottom, #4cbdb1, #5f469e, #4cbdb1);
			}

			.top-info {
				position: absolute;
				margin-bottom: 80px;
				z-index: 20;
				display: flex;
				width: 348px;
				justify-content: space-between;
				margin-top: 72px;
				padding-left: 6px;
				padding-right: 6px;
			}

			.cup-logo {
				width: 72px;
				height: 72px;
			}

			.country-card {
				width: 56px;
				height: 72px;
				background-color: #e8e8dc;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
			}

			.country-card-name {
				font-weight: bold;
				font-family: "Roboto", sans-serif;
				color: #901e3d;
			}

			.country-card img {
				max-width: 90%;
				max-height: 42px;
				margin-bottom: 2px;
			}

			.div-card {
				height: 472px;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				flex-direction: column;
				display: flex;
				padding-bottom: 8px;
			}

			.image-card {
				object-fit: contain;
				max-width: 90%;
				max-height: 100%;
			}

			.player-name {
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				bottom: 8px;
			}

			.player-name p {
				position: absolute;
				color: #901e3d;
				font-size: 2rem;
				font-weight: bold;
				z-index: 10;
				font-family: "Roboto", sans-serif;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.card-date {
				color: #e8e8dc;
				font-family: "Roboto", sans-serif;
				display: flex;
				justify-content: center;
				align-items: center;
				font-weight: bold;
				position: relative;
				bottom: 17px;
				z-index: 15;
			}

			.card-date img {
				height: 80%;
			}

			.card-date p {
				position: absolute;
			}
		</style>
        </head>
        <body class="container">
            <div class="card">
                <div class="top-info">
                    <img src="${basePath}/cup-logo.png" alt="logo da copa" class="cup-logo" />
                    <div class="country-card">
                        <p class="country-card-name">${code}</p>
                        <img src=${flag} alt="bandeira do país" />
                    </div>
                </div>
                <div class="div-card">
                    <img src=${imageUrl} alt="imagem do jogador" class="image-card" />
                    <div class="player-name">
						<p>${name}</p>
						<img src="${basePath}/backgrounds/background-name.svg" alt="name card" />
					</div>
                    <div class="card-date">
						<p>${date}</p>
						<img src="${basePath}/backgrounds/background-date.svg" alt="" />
					</div>
				</div>
                </div>
            </div>
        </body>
    </html>
    
    `
}
