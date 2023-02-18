from stable_baselines import PPO2
from stable_baselines.common import set_global_seeds
from stable_baselines.common.vec_env import DummyVecEnv
from stable_baselines.common.policies import MlpPolicy
from flask_socketio import SocketIO

import gym
from . import gym_offload_autoscale
import numpy as np
import os


class PPO2Algorithm:
    def __init__(self,
                 time_steps: str, time_slots: str, p_coeff: str,
                 verbose: str, random_seed: str, socket: SocketIO) -> None:
        self.time_steps = int(time_steps)
        self.time_slots = int(time_slots)
        self.p_coeff = float(p_coeff)
        self.verbose = float(verbose)
        self.random_seed = int(random_seed)
        self.socket = socket
        self.rewards_list = []
        self.avg_rewards = []
        self.rewards_time_list = []
        self.avg_rewards_time_list = []
        self.rewards_bak_list = []
        self.avg_rewards_bak_list = []
        self.rewards_bat_list = []
        self.avg_rewards_bat_list = []
        self.avg_rewards_energy_list = []
        self.ppo_data = []
        self.init_env()
        self.set_seed()

    def init_env(self) -> None:
        self.env = gym.make('offload-autoscale-v0', p_coeff=self.p_coeff)
        # Optional: PPO2 requires a vectorized environment to run
        # the env is now wrapped automatically when passing it to the
        # constructor
        self.env = DummyVecEnv([lambda: self.env])
        self.model = PPO2(
            MlpPolicy, self.env, verbose=self.verbose, seed=self.random_seed)
        self.model.learn(total_timesteps=self.time_steps)

    def set_seed(self) -> None:
        set_global_seeds(100)
        self.env.env_method('seed', self.random_seed)
        np.random.seed(self.random_seed)
        os.environ['PYTHONHASHSEED'] = str(self.random_seed)
        self.model.set_random_seed(self.random_seed)

    def run(self) -> None:
        obs = self.env.reset()
        for i in range(self.time_slots):
            action, _states = self.model.predict(obs, deterministic=True)
            obs, rewards, dones, info = self.env.step(action)
            self.rewards_list.append(1 / rewards)
            self.avg_rewards.append(np.mean(self.rewards_list[:]))
            t, bak, bat = self.env.render()
            self.rewards_time_list.append(t)
            self.avg_rewards_time_list.append(
                np.mean(self.rewards_time_list[:]))
            self.rewards_bak_list.append(bak)
            self.avg_rewards_bak_list.append(np.mean(self.rewards_bak_list[:]))
            self.rewards_bat_list.append(bat)
            self.avg_rewards_bat_list.append(np.mean(self.rewards_bat_list[:]))
            self.avg_rewards_energy_list.append(
                self.avg_rewards_bak_list[-1] + self.avg_rewards_bat_list[-1])

            data = {
                'avg_total': f'{self.avg_rewards[-1]}',
                'avg_delay': f'{self.avg_rewards_time_list[-1]}',
                'avg_backup': f'{self.avg_rewards_bak_list[-1]}',
                'avg_battery': f'{self.avg_rewards_bat_list[-1]}',
                'avg_energy': f'{self.avg_rewards_energy_list[-1]}',
                'end_of_data': 'False' if i + 1 < self.time_slots else 'True'
            }
            self.socket.emit("PPO2", data, broadcast=True)
            if dones:
                self.env.reset()
            # env.render()
