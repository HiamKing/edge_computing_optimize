from flask import Flask, request
from flask_cors import CORS, cross_origin
from algorithms.ppo2 import PPO2Algorithm
from flask_socketio import SocketIO

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins="*")
socketio.init_app(app)

ALGORITHM_MP = {
    'PPO': PPO2Algorithm
}


@app.route("/run_algorithm/<algorithm_name>", methods=['GET'])
@cross_origin()
def hello_world(algorithm_name):
    args = request.args.to_dict()
    algorithm = ALGORITHM_MP[algorithm_name](**args, socket=socketio)
    algorithm.run()
    return {}


if __name__ == '__main__':
    socketio.run(app)
