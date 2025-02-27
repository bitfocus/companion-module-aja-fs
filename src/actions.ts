import { audioChannelOptions, embedOptions, outputAudioChannels, outputOptions } from './enums.js'
import ky from 'ky'
import type { ModuleInstance } from './main.js'

export function UpdateActions(self: ModuleInstance): void {
	self.setActionDefinitions({
		set_audio_output: {
			name: 'Set Audio Output',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Source',
					default: 18,
					choices: embedOptions,
				},
				{
					id: 'output',
					type: 'dropdown',
					label: 'Output',
					default: 1,
					choices: outputOptions,
				},
			],
			callback: async (event) => {
				const url = `http://${self.config.host}/config?action=set&paramid=eParamID_AudioOutputSelect_Vid${event.options.output}Embed&value=${event.options.mode}&configid=0`
				const json = await ky.get(url).json()
				if (json) {
					console.log('Result', json)
				}
			},
		},
		set_audio_embed_map: {
			name: 'Set Audio Embed Map',
			options: [
				{
					id: 'sourceChannel',
					type: 'dropdown',
					label: 'Source Channel',
					default: 0,
					choices: audioChannelOptions,
				},
				{
					id: 'output',
					type: 'dropdown',
					label: 'Output Port',
					default: 1,
					choices: outputOptions,
				},
				{
					id: 'outputChannel',
					type: 'dropdown',
					label: 'Output Channel',
					default: 1,
					choices: outputAudioChannels,
				},
			],
			callback: async (event) => {
				const url = `http://${self.config.host}/config?action=set&paramid=eParamID_AudioOutputCh${event.options.outputChannel}_SDI${event.options.output}&value=${event.options.sourceChannel}&configid=0`
				const json = await ky.get(url).json()
				if (json) {
					console.log('Result', json)
				}
			},
		},
	})
}
