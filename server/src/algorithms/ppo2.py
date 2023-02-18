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
    def __init__(self, time_steps: str, p_coeff: str,
                 timeslot_duration: str, max_number_of_server: str,
                 server_service_rate: str, d_sta: str, coef_dyn: str,
                 server_power_consumption: str, batery_capacity: str,
                 lamda_high: str, lamda_low: str, h_high: str, h_low: str,
                 back_up_cost_coef: str, normalized_unit_depreciation_cost: str,
                 time_steps_per_episode: str, verbose: str, random_seed: str,
                 socket: SocketIO) -> None:
        self.time_steps = int(time_steps)
        self.timeslot_duration = float(timeslot_duration)
        self.time_steps_per_episode = int(time_steps_per_episode)
        self.time_slots = int(self.time_steps / self.time_steps_per_episode)
        self.max_number_of_server = int(max_number_of_server)
        self.server_service_rate = int(server_service_rate)
        self.d_sta = int(d_sta)
        self.coef_dyn = float(coef_dyn)
        self.server_power_consumption = int(server_power_consumption)
        self.batery_capacity = int(batery_capacity)
        self.lamda_high = int(lamda_high)
        self.lamda_low = int(lamda_low)
        self.h_high = float(h_high)
        self.h_low = float(h_low)
        self.back_up_cost_coef = float(back_up_cost_coef)
        self.normalized_unit_depreciation_cost = float(normalized_unit_depreciation_cost)
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
        self.env = gym.make('offload-autoscale-v0', p_coeff=self.p_coeff,
                            timeslot_duration=self.timeslot_duration, max_number_of_server=self.max_number_of_server,
                            server_service_rate=self.server_service_rate, d_sta=self.d_sta, coef_dyn=self.coef_dyn,
                            server_power_consumption=self.server_power_consumption, batery_capacity=self.batery_capacity,
                            lamda_high=self.lamda_high, lamda_low=self.lamda_low, h_high=self.h_high, h_low=self.h_low,
                            back_up_cost_coef=self.back_up_cost_coef,
                            normalized_unit_depreciation_cost=self.normalized_unit_depreciation_cost,
                            time_steps_per_episode=self.time_steps_per_episode)
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
            self.socket.emit("PPO", data, broadcast=True)
            if dones:
                self.env.reset()
            # env.render()
