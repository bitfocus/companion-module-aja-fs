import { combineRgb } from '@companion-module/base'
import type { ModuleInstance } from './main.js'

export function UpdateFeedbacks(instance: ModuleInstance): void {
	const channels = instance.getChannelChoices()

	instance.setFeedbackDefinitions({
		connectionStatus: {
			type: 'boolean',
			name: 'Device Connected',
			description: 'Changes button appearance when device is connected',
			defaultStyle: {
				bgcolor: combineRgb(0, 200, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => instance.connected,
		},

		sdiInputDetected: {
			type: 'boolean',
			name: 'SDI Input Detected',
			description: 'True when a signal is detected on the specified SDI input',
			defaultStyle: {
				bgcolor: combineRgb(0, 200, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'channel',
					type: 'dropdown',
					label: 'SDI Channel',
					choices: [
						{ id: '1', label: 'SDI 1' },
						{ id: '2', label: 'SDI 2' },
						{ id: '3', label: 'SDI 3' },
						{ id: '4', label: 'SDI 4' },
						{ id: '5', label: 'SDI 5' },
						{ id: '6', label: 'SDI 6' },
						{ id: '7', label: 'SDI 7' },
						{ id: '8', label: 'SDI 8' },
					],
					default: '1',
				},
			],
			callback: (feedback) => {
				const ch = String(feedback.options.channel)
				const format = instance.deviceState[`sdi${ch}_format`]
				return format !== undefined && format !== '' && format !== '98' && format !== 'No Input'
			},
		},

		channelFrozen: {
			type: 'boolean',
			name: 'Channel Frozen',
			description: 'True when the specified video channel output is frozen',
			defaultStyle: {
				bgcolor: combineRgb(0, 0, 200),
				color: combineRgb(255, 255, 255),
			},
			options: [{ id: 'channel', type: 'dropdown', label: 'Channel', choices: channels, default: '1' }],
			callback: (feedback) => {
				const ch = String(feedback.options.channel)
				return instance.deviceState[`vid${ch}_freeze`] === '1'
			},
		},
	})
}
