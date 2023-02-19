const algorithms = {
    'PPO': {
        algoParams: ['Training time slots', 'Verbose', 'Random seed'],
        envParams: [
            'Time slots',
            'Priority coefficient', 'Number of servers',
            'Length each time slot', 'Battery capacity',
            'Server service rate', 'Workload (λ)',
            'Network congestion (k)', 'Back up power coefficient (φ)',
            'Battery depreciation coefficient (ω)', 'Base station static power',
            'Dynamic power coefficient', 'Server power consumption',
            'Time steps per episode'
        ],
        algoMapping: {
            'Training time slots': 'train_time_slots',
            'Verbose': 'verbose',
            'Random seed': 'random_seed',
        },
        envMapping: {
            'Time slots': 'time_slots',
            'Priority coefficient': 'p_coeff',
            'Number of servers': 'max_number_of_server',
            'Length each time slot': 'timeslot_duration',
            'Battery capacity': 'batery_capacity',
            'Server service rate': 'server_service_rate',
            'Workload (λ)': {high: 'lamda_high', low: 'lamda_low'},
            'Network congestion (k)': {high: 'h_high', low: 'h_low'},
            'Back up power coefficient (φ)': 'back_up_cost_coef',
            'Battery depreciation coefficient (ω)': 'normalized_unit_depreciation_cost',
            'Base station static power': 'd_sta',
            'Dynamic power coefficient': 'coef_dyn',
            'Server power consumption': 'server_power_consumption',
            'Time steps per episode': 'time_steps_per_episode',
        }
    },
    'DQN': {
        algoParams: ['Training time slots', 'Verbose', 'Random seed'],
        envParams: [
            'Time slots',
            'Priority coefficient', 'Number of servers',
            'Length each time slot', 'Battery capacity',
            'Server service rate', 'Workload (λ)',
            'Network congestion (k)', 'Back up power coefficient (φ)',
            'Battery depreciation coefficient (ω)', 'Base station static power',
            'Dynamic power coefficient', 'Server power consumption',
            'Time steps per episode'
        ],
        algoMapping: {
            'Training time slots': 'train_time_slots',
            'Verbose': 'verbose',
            'Random seed': 'random_seed',
        },
        envMapping: {
            'Time slots': 'time_slots',
            'Priority coefficient': 'p_coeff',
            'Number of servers': 'max_number_of_server',
            'Length each time slot': 'timeslot_duration',
            'Battery capacity': 'batery_capacity',
            'Server service rate': 'server_service_rate',
            'Workload (λ)': {high: 'lamda_high', low: 'lamda_low'},
            'Network congestion (k)': {high: 'h_high', low: 'h_low'},
            'Back up power coefficient (φ)': 'back_up_cost_coef',
            'Battery depreciation coefficient (ω)': 'normalized_unit_depreciation_cost',
            'Base station static power': 'd_sta',
            'Dynamic power coefficient': 'coef_dyn',
            'Server power consumption': 'server_power_consumption',
            'Time steps per episode': 'time_steps_per_episode',
        }
    },
    'A2C': {
        params: []
    },
    'SAC': {
        params: []
    },
    'TRPO': {
        params: []
    }
  };

export { algorithms };
