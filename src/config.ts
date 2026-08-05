import type { SomeCompanionConfigField } from '@companion-module/base'

export interface ModuleConfig {
	host: string
	port: number
	pollInterval: number
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'Device IP',
			width: 8,
			default: '',
			required: true,
		},
		{
			type: 'number',
			id: 'port',
			label: 'HTTP Port',
			width: 4,
			default: 80,
			min: 1,
			max: 65535,
			required: true,
		},
		{
			type: 'number',
			id: 'pollInterval',
			label: 'Poll Interval (ms)',
			width: 4,
			default: 3000,
			min: 500,
			max: 30000,
			required: true,
		},
	]
}
