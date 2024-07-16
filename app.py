from flask import Flask, request, jsonify, render_template
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_script', methods=['POST'])
def generate_script():
    data = request.get_json()
    script = data['script']

    # Burada güvenlik kontrollerini yapabilirsiniz
    if 'rm -rf' in script:  # Zararlı komut örneği
        return jsonify({'error': 'Zararlı komut tespit edildi!'}), 400

    # PowerShell scriptini çalıştırma
    try:
        result = subprocess.run(['powershell', '-Command', script], capture_output=True, text=True)
        return jsonify({'script': script, 'output': result.stdout})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
