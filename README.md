# Gerador de PDF Studio Praxis

## POST /pdf

> To call this route you need to pass a `token` field in the JSON request body containing a JWT token **WITH the claim `permissions` containing a `"generate-pdf"` string**.

> Also, the `JWT_SECRET` in the `.env` file must correspond to the secret used to generate the token coming in the requests.

```sh
curl --request POST \
  --url http://localhost:8080/pdf \
  --header 'Content-Type: application/json' \
  --data '{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9ucyI6WyJnZW5lcmF0ZS1wZGYiXSwiaWF0IjoxNzMwNTgzMTMwLCJleHAiOjE3NjIxNDA3MzB9.HVTAmBpvilJrNFMvTw7dqWOVXLx3fWeqTnBSXdizxj0",
	"images": [
		{
			"url": "https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg",
			"height": 300
		},
		{
			"url": "https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg",
			"height": 300
		},
		{
			"url": "https://cdn.theatlantic.com/thumbor/OgQgHFiqAd92pArI1zjmcUHjoSc=/144x0:2411x1700/1200x900/media/img/mt/2017/06/shutterstock_319985324/original.jpg",
			"height": 200
		}
	],
	"fileName": "relatorio-exemplo.pdf",
	"content": {
		"header": {
			"title": "Praxis Studio",
			"professionalName": "Kaoma Paiva Hodapp",
			"professionalNumber": "4/319187-F"
		},
		"record": {
			"patientName": "Joel Vitor Torres",
			"title": "Ficha de evolução",
			"createdAt": "2024-09-24T01:34:24.895Z"
		},
		"report": [
			{
				"title": "Relatos do paciente",
				"content": [
					{
						"text": "Caterva tondeo denego arto triduana acquiro depromo degusto fugit. Eum cresco alias vestigium demens adulescens subito comburo demens. Subnecto dolorum denique aperte crinis viscus deficio vitiosus acervus. Stella demum thesis attollo coniecto carcer casso eos caelestis aspernatur. Articulus vobis vereor ademptio. Verus quam temptatio ducimus vilicus vae vulgus veritas."
					},
					{
						"text": "Volaticus coniecto vigor adduco decipio aestas barba villa aduro voco. Statua deputo tribuo. Demum dedecor confero depulso confugo iusto. Allatus comitatus creptio cohors tripudio."
					},
					{
						"text": "Escala de dor: 9"
					}
				]
			},
			{
				"title": "Análise Inicial",
				"content": [
					{
						"text": "Palpação: Não sei"
					},
					{
						"text": "Inspeção: também não faço ideia"
					},
					{
						"text": "Edema: Sim | Rubor: Sim"
					}
				]
			},
			{
				"title": "Fotos",
				"content": [
					{
						"image": 0
					},
					{
						"image": 1
					},
					{
						"image": 2
					}
				]
			},
			{
				"title": "Pilates",
				"content": [
					{
						"text": "Aparelho(s): Bastante"
					},
					{
						"text": "Tipo de exercício: Que tem que mexer o corpo"
					},
					{
						"text": "Observações: O céu é azul"
					}
				]
			}
		]
	}
}'
```
