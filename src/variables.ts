import type { ModuleInstance } from './main.js'
import type { DeviceType } from './params.js'

export function UpdateVariableDefinitions(instance: ModuleInstance): void {
	const channels = instance.deviceType === 'FS2' ? 2 : 4
	const sdiCount = instance.deviceType === 'FS2' ? 2 : 8

	const defs = [
		{ variableId: 'device_type', name: 'Device Type' },
		{ variableId: 'system_name', name: 'System Name' },
		{ variableId: 'product_id', name: 'Product ID' },
		{ variableId: 'software_version', name: 'Software Version' },
		{ variableId: 'ref_format', name: 'Reference Format' },
		{ variableId: 'genlock_source', name: 'Genlock Source' },
	]

	// Per-SDI input format
	for (let i = 1; i <= sdiCount; i++) {
		defs.push({ variableId: `sdi${i}_format`, name: `SDI ${i} Input Format` })
	}

	// Per-channel variables
	for (let ch = 1; ch <= channels; ch++) {
		defs.push(
			{ variableId: `vid${ch}_input`, name: `Vid ${ch} Input` },
			{ variableId: `vid${ch}_output_format`, name: `Vid ${ch} Output Format` },
			{ variableId: `vid${ch}_detected_format`, name: `Vid ${ch} Detected Format` },
			{ variableId: `vid${ch}_freeze`, name: `Vid ${ch} Freeze` },
		)

		// HDR-specific (FS4/FS-HDR)
		if (instance.deviceType !== 'FS2') {
			defs.push(
				{ variableId: `vid${ch}_hdr_transform`, name: `Vid ${ch} HDR Transform` },
				{ variableId: `vid${ch}_dyn_range_in`, name: `Vid ${ch} Dyn Range IN` },
				{ variableId: `vid${ch}_dyn_range_out`, name: `Vid ${ch} Dyn Range OUT` },
				{ variableId: `vid${ch}_colorfront_mode`, name: `Vid ${ch} Colorfront Mode` },
			)
		}
	}

	instance.setVariableDefinitions(defs)
}

/** Map device parameter IDs to variable IDs */
export function buildParamToVariableMap(device: DeviceType): Record<string, string> {
	const map: Record<string, string> = {
		eParamID_SystemName: 'system_name',
		eParamID_ProductID: 'product_id',
		eParamID_SoftwareVersion: 'software_version',
		eParamID_DetectedReferenceFormat: 'ref_format',
		eParamID_GenlockSource: 'genlock_source',
	}

	const sdiCount = device === 'FS2' ? 2 : 8
	for (let i = 1; i <= sdiCount; i++) {
		map[`eParamID_SDI${i}DetectedInputFormat`] = `sdi${i}_format`
	}

	const channels = device === 'FS2' ? 2 : 4
	for (let ch = 1; ch <= channels; ch++) {
		map[`eParamID_Vid${ch}VideoInput`] = `vid${ch}_input`
		map[`eParamID_Vid${ch}ActualOutputFormat`] = `vid${ch}_output_format`
		map[`eParamID_Vid${ch}DetectedInputFormat`] = `vid${ch}_detected_format`
		map[`eParamID_Vid${ch}FreezeOutput`] = `vid${ch}_freeze`

		if (device !== 'FS2') {
			map[`eParamID_Vid${ch}ColorHDRTransform`] = `vid${ch}_hdr_transform`
			map[`eParamID_Vid${ch}DynamicRangeAndGamut`] = `vid${ch}_dyn_range_in`
			map[`eParamID_Vid${ch}DynamicRangeAndGamutOut`] = `vid${ch}_dyn_range_out`
			map[`eParamID_Vid${ch}ColorfrontMode`] = `vid${ch}_colorfront_mode`
		}
	}

	return map
}
