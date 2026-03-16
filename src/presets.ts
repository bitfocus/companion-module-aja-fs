import { combineRgb, type CompanionPresetDefinitions } from '@companion-module/base'
import type { ModuleInstance } from './main.js'

export function UpdatePresets(instance: ModuleInstance): void {
	const presets: CompanionPresetDefinitions = {}
	const channelCount = instance.deviceType === 'FS2' ? 2 : 4
	const sdiCount = instance.deviceType === 'FS2' ? 2 : 8
	const isHDR = instance.deviceType === 'FS4' || instance.deviceType === 'FS-HDR'
	const pre = 'aja-fs'

	// ── Connection Status ───────────────────────────────
	presets['connection_status'] = {
		type: 'button',
		category: 'Status',
		name: 'Connection Status',
		style: {
			text: `$(${pre}:system_name)\\n$(${pre}:device_type)`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(128, 0, 0),
		},
		steps: [{ down: [], up: [] }],
		feedbacks: [{ feedbackId: 'connectionStatus', options: {}, style: { bgcolor: combineRgb(0, 128, 0) } }],
	}

	// ── Preset Recall 1-10 ──────────────────────────────
	for (let i = 1; i <= 10; i++) {
		presets[`preset_recall_${i}`] = {
			type: 'button',
			category: 'Presets',
			name: `Recall Preset ${i}`,
			style: {
				text: `Preset\\n${i}`,
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 100),
			},
			steps: [{ down: [{ actionId: 'recallPreset', options: { preset: i } }], up: [] }],
			feedbacks: [],
		}
	}

	// ── Preset Save 1-10 ────────────────────────────────
	for (let i = 1; i <= 10; i++) {
		presets[`preset_save_${i}`] = {
			type: 'button',
			category: 'Presets',
			name: `Save Preset ${i}`,
			style: {
				text: `Save\\n${i}`,
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(100, 0, 0),
			},
			steps: [{ down: [{ actionId: 'savePreset', options: { preset: i } }], up: [] }],
			feedbacks: [],
		}
	}

	// ── SDI Input Status ────────────────────────────────
	for (let i = 1; i <= Math.min(sdiCount, 8); i++) {
		presets[`sdi${i}_status`] = {
			type: 'button',
			category: 'SDI Inputs',
			name: `SDI ${i} Format`,
			style: {
				text: `SDI ${i}\\n$(${pre}:sdi${i}_format)`,
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [
				{
					feedbackId: 'sdiInputDetected',
					options: { channel: String(i) },
					style: { bgcolor: combineRgb(0, 128, 0) },
				},
			],
		}
	}

	// ── Per-Channel: Freeze Toggle ──────────────────────
	for (let ch = 1; ch <= channelCount; ch++) {
		presets[`vid${ch}_freeze`] = {
			type: 'button',
			category: 'Freeze',
			name: `Freeze Vid ${ch}`,
			style: {
				text: `FREEZE\\nVid ${ch}`,
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{ down: [{ actionId: 'freezeOutput', options: { channel: String(ch), state: '1' } }], up: [] },
				{ down: [{ actionId: 'freezeOutput', options: { channel: String(ch), state: '0' } }], up: [] },
			],
			feedbacks: [
				{
					feedbackId: 'channelFrozen',
					options: { channel: String(ch) },
					style: { bgcolor: combineRgb(0, 0, 200) },
				},
			],
		}
	}

	// ── Per-Channel: Video Status ───────────────────────
	for (let ch = 1; ch <= channelCount; ch++) {
		presets[`vid${ch}_status`] = {
			type: 'button',
			category: 'Video Status',
			name: `Vid ${ch} Status`,
			style: {
				text: `Vid ${ch}\\nIN: $(${pre}:vid${ch}_detected_format)\\nOUT: $(${pre}:vid${ch}_output_format)`,
				size: '7',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(30, 30, 30),
			},
			steps: [{ down: [], up: [] }],
			feedbacks: [],
		}
	}

	// ── Per-Channel: Test Pattern ───────────────────────
	for (let ch = 1; ch <= channelCount; ch++) {
		presets[`vid${ch}_testpattern`] = {
			type: 'button',
			category: 'Test Pattern',
			name: `Test Pattern Vid ${ch}`,
			style: {
				text: `TPG\\nVid ${ch}`,
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(80, 80, 0),
			},
			steps: [
				{ down: [{ actionId: 'setTestPattern', options: { channel: String(ch), state: '4' } }], up: [] },
				{ down: [{ actionId: 'setTestPattern', options: { channel: String(ch), state: '0' } }], up: [] },
			],
			feedbacks: [],
		}
	}

	if (isHDR) {
		// ── HDR Transform Buttons ───────────────────────
		const transforms = [
			{ id: '0', label: 'CFE\\nLive', short: 'cfe_live' },
			{ id: '5', label: 'CFE\\nFilm', short: 'cfe_film' },
			{ id: '8', label: 'CFE\\nTV', short: 'cfe_tv' },
			{ id: '1', label: 'BBC\\nHLG', short: 'bbc_hlg' },
			{ id: '7', label: 'NBCU\\nLUT', short: 'nbcu_lut' },
			{ id: '2', label: 'User\\nLUT', short: 'user_lut' },
		]

		for (const xform of transforms) {
			presets[`vid1_hdr_${xform.short}`] = {
				type: 'button',
				category: 'HDR Transform',
				name: `Vid 1 ${xform.label.replace('\\n', ' ')}`,
				style: {
					text: xform.label,
					size: '14',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(80, 0, 80),
				},
				steps: [
					{
						down: [{ actionId: 'setHDRTransform', options: { channel: '1', transform: xform.id } }],
						up: [],
					},
				],
				feedbacks: [],
			}
		}

		// ── Dynamic Range IN/OUT shortcuts for Vid 1 ────
		const dynModes = [
			{ id: '0', label: 'SDR\\n709' },
			{ id: '1', label: 'PQ\\n2020' },
			{ id: '3', label: 'HLG\\n2100' },
		]

		for (const mode of dynModes) {
			presets[`vid1_dynin_${mode.id}`] = {
				type: 'button',
				category: 'Dynamic Range',
				name: `Vid 1 IN ${mode.label.replace('\\n', ' ')}`,
				style: {
					text: `IN\\n${mode.label}`,
					size: '14',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 80, 80),
				},
				steps: [{ down: [{ actionId: 'setDynRangeIn', options: { channel: '1', mode: mode.id } }], up: [] }],
				feedbacks: [],
			}

			presets[`vid1_dynout_${mode.id}`] = {
				type: 'button',
				category: 'Dynamic Range',
				name: `Vid 1 OUT ${mode.label.replace('\\n', ' ')}`,
				style: {
					text: `OUT\\n${mode.label}`,
					size: '14',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 60, 100),
				},
				steps: [{ down: [{ actionId: 'setDynRangeOut', options: { channel: '1', mode: mode.id } }], up: [] }],
				feedbacks: [],
			}
		}

		// ── HDR Color Reset per channel ─────────────────
		for (let ch = 1; ch <= channelCount; ch++) {
			presets[`vid${ch}_hdr_reset`] = {
				type: 'button',
				category: 'HDR Color',
				name: `Reset HDR Vid ${ch}`,
				style: {
					text: `RESET\\nVid ${ch}`,
					size: '14',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(150, 0, 0),
				},
				steps: [{ down: [{ actionId: 'resetHDRColor', options: { channel: String(ch) } }], up: [] }],
				feedbacks: [],
			}
		}

		// ── SDR Preview Toggle ──────────────────────────
		for (let ch = 1; ch <= channelCount; ch++) {
			presets[`vid${ch}_sdr_preview`] = {
				type: 'button',
				category: 'HDR Color',
				name: `SDR Preview Vid ${ch}`,
				style: {
					text: `SDR PVW\\nVid ${ch}`,
					size: '14',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(60, 60, 0),
				},
				steps: [
					{ down: [{ actionId: 'setSdrPreview', options: { channel: String(ch), state: '1' } }], up: [] },
					{ down: [{ actionId: 'setSdrPreview', options: { channel: String(ch), state: '0' } }], up: [] },
				],
				feedbacks: [],
			}
		}

		// ── Per-Channel HDR Info ─────────────────────────
		for (let ch = 1; ch <= channelCount; ch++) {
			presets[`vid${ch}_hdr_status`] = {
				type: 'button',
				category: 'HDR Status',
				name: `Vid ${ch} HDR Status`,
				style: {
					text: `Vid ${ch} HDR\\n$(${pre}:vid${ch}_hdr_transform)\\n$(${pre}:vid${ch}_dyn_range_in) > $(${pre}:vid${ch}_dyn_range_out)`,
					size: '7',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(50, 0, 50),
				},
				steps: [{ down: [], up: [] }],
				feedbacks: [],
			}
		}
	}

	// ── Genlock Source Buttons ───────────────────────────
	const genlockButtons = [
		{ id: '0', label: 'REF\\nBNC' },
		{ id: '1', label: 'FREE\\nRUN' },
		{ id: '2', label: 'GEN\\nSDI 1' },
		{ id: '3', label: 'GEN\\nSDI 2' },
	]

	for (const gl of genlockButtons) {
		presets[`genlock_${gl.id}`] = {
			type: 'button',
			category: 'Reference',
			name: `Genlock ${gl.label.replace('\\n', ' ')}`,
			style: {
				text: gl.label,
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(50, 50, 50),
			},
			steps: [{ down: [{ actionId: 'setGenlockSource', options: { source: gl.id } }], up: [] }],
			feedbacks: [],
		}
	}

	// ── Reference Status ────────────────────────────────
	presets['ref_status'] = {
		type: 'button',
		category: 'Reference',
		name: 'Reference Status',
		style: {
			text: `REF\\n$(${pre}:ref_format)\\n$(${pre}:genlock_source)`,
			size: '7',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(30, 30, 30),
		},
		steps: [{ down: [], up: [] }],
		feedbacks: [],
	}

	instance.setPresetDefinitions(presets)
}
