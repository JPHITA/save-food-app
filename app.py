from flask import Flask, render_template, session, send_from_directory, request, jsonify
import openai

app = Flask(__name__)
app.secret_key = "secret_key"
openai.api_key = "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"

# index routes ///////////////////////////////////////////////////////////////
@app.route('/')
def index():
    return render_template('index.html')

# comprar routes /////////////////////////////////////////////////////////////
@app.route('/comprar')
def comprar():
    return render_template('comprar.html')

# soporte routes /////////////////////////////////////////////////////////////
@app.route('/soporte')
def soporte():
    session["chat"] = [
        {"role": "system", "content": "eres un asistente de una aplicacion de comida llamada 'safe food'. responde con frases cortas"},
        {"role": "assistant", "content": "Buen dia, ¿en que puedo ayudarle?"}
    ]

    return render_template('soporte.html')


@app.post('/soporte/chat')
def chat():
    chat = session["chat"]
    chat.append({"role": "user", "content": request.json['mensaje']})

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=session["chat"],
        temperature=1
    )

    chat.append({"role": "assistant", "content": response["choices"][0]["message"]["content"]})

    session["chat"] = chat

    return jsonify({'status': 'ok', "mensaje": response["choices"][0]["message"]["content"]})

# resourses routes ///////////////////////////////////////////////////////////
@app.route('/img/app/index/<tienda>/logo.jpg')
def logo(tienda):
    return send_from_directory(f'static/img/app/index/{tienda}', 'logo.jpg')

@app.route('/img/app/index/<tienda>/<j>.jpg')
def img(tienda, j):
    return send_from_directory(f'static/img/app/index/{tienda}', f'{j}.jpg')