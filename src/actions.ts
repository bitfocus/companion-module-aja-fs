import type { ModuleInstance } from './main.js'
import {
	GENLOCK_SOURCES,
	HDR_TRANSFORMS,
	DYN_RANGE_IN,
	DYN_RANGE_OUT,
	TV_CONVERSIONS,
	COLORFRONT_MODES,
	ON_OFF,
	FREEZE_ON_LOSS,
	TEST_PATTERNS,
	TEST_PATTERN_TYPES,
	BACKGROUND_FILL,
	AUDIO_OUTPUT_SOURCES,
	AUDIO_OUTPUT_CHANNELS,
	UPCONVERT_MODES,
	DOWNCONVERT_MODES,
	HDR_GAIN_PARAMS,
	HDR_LIFT_PARAMS,
	HDR_GAMMA_PARAMS,
	TV_GAIN_PARAMS,
	CC_GAIN_PARAMS,
	CC_BLACK_PARAMS,
	CC_GAMMA_PARAMS,
	LEGALIZER_CLIP_PARAMS,
	MATTE_PARAMS,
	LUT_SELECT_PARAMS,
	LUT_COLORSPACE_PARAMS,
	LUT_RANGE_PARAMS,
	FILM_LOOK_PARAMS,
	getAudioSourceChannels,
	getVideoInputChoices,
	vidParam,
	getAllParamChoices,
	type ParamChoice,
} from './params.js'

export function UpdateActions(instance: ModuleInstance): void {
	const channels = instance.getChannelChoices()
	const paramChoices = getAllParamChoices(instance.deviceType)
	const videoInputs = getVideoInputChoices(instance.deviceType)

	// ── Helpers ─────────────────────────────────────────────
	// Reduces boilerplate for the common action patterns

	/** Per-channel action with a numeric value */
	const chNum = (name: string, paramId: string) => ({
		name,
		options: [
			{ id: 'channel', type: 'dropdown' as const, label: 'Channel', choices: channels, default: '1' },
			{
				id: 'value',
				type: 'number' as const,
				label: 'Value',
				min: -32768,
				max: 32768,
				default: 0,
				required: true as const,
			},
		],
		callback: async (action: { options: Record<string, unknown> }) => {
			const param = vidParam(paramId, String(action.options.channel))
			await instance.apiSetParam(param, Number(action.options.value))
		},
	})

	/** Per-channel action with a dropdown value */
	const chDrop = (name: string, paramId: string, choices: ParamChoice[], defaultVal: string) => ({
		name,
		options: [
			{ id: 'channel', type: 'dropdown' as const, label: 'Channel', choices: channels, default: '1' },
			{ id: 'value', type: 'dropdown' as const, label: 'Value', choices, default: defaultVal },
		],
		callback: async (action: { options: Record<string, unknown> }) => {
			const param = vidParam(paramId, String(action.options.channel))
			await instance.apiSetParam(param, String(action.options.value))
		},
	})

	/** Per-channel action with a component dropdown (whose id is a param template) + numeric value */
	const chCompNum = (name: string, components: ParamChoice[]) => ({
		name,
		options: [
			{ id: 'channel', type: 'dropdown' as const, label: 'Channel', choices: channels, default: '1' },
			{
				id: 'component',
				type: 'dropdown' as const,
				label: 'Component',
				choices: components,
				default: components[0]?.id ?? '',
			},
			{
				id: 'value',
				type: 'number' as const,
				label: 'Value',
				min: -32768,
				max: 32768,
				default: 0,
				required: true as const,
			},
		],
		callback: async (action: { options: Record<string, unknown> }) => {
			const param = vidParam(String(action.options.component), String(action.options.channel))
			await instance.apiSetParam(param, Number(action.options.value))
		},
	})

	instance.setActionDefinitions({
		// ── Presets ──────────────────────────────────────────
		recallPreset: {
			name: 'Recall Preset',
			options: [{ id: 'preset', type: 'number', label: 'Preset Number', min: 1, max: 40, default: 1, required: true }],
			callback: async (action) => {
				await instance.apiSetParam('eParamID_RegisterRecall', Number(action.options.preset))
			},
		},

		savePreset: {
			name: 'Save Preset',
			options: [{ id: 'preset', type: 'number', label: 'Preset Number', min: 1, max: 40, default: 1, required: true }],
			callback: async (action) => {
				await instance.apiSetParam('eParamID_RegisterSave', Number(action.options.preset))
			},
		},

		// ── Reference / Genlock ─────────────────────────────
		setGenlockSource: {
			name: 'Set Genlock Source',
			options: [{ id: 'source', type: 'dropdown', label: 'Source', choices: GENLOCK_SOURCES, default: '0' }],
			callback: async (action) => {
				await instance.apiSetParam('eParamID_GenlockSource', String(action.options.source))
			},
		},

		suppressReferenceAlarm: chDrop('Suppress Reference Alarm', 'eParamID_SuppressReferenceAlarm', ON_OFF, '0'),

		// ── Video Input / Output ────────────────────────────
		setVideoInput: {
			name: 'Set Video Input',
			options: [
				{ id: 'channel', type: 'dropdown', label: 'Channel', choices: channels, default: '1' },
				{ id: 'input', type: 'dropdown', label: 'Input', choices: videoInputs, default: '0' },
			],
			callback: async (action) => {
				const param = vidParam('eParamID_Vid1VideoInput', String(action.options.channel))
				await instance.apiSetParam(param, String(action.options.input))
			},
		},

		setOutputFormat: chNum('Set Output Format', 'eParamID_Vid1OutputFormat'),

		// ── Up/Down Convert (FS2, FS4) ──────────────────────
		setUpconvertMode: chDrop('Set Up Convert Mode', 'eParamID_Vid1UpconvertMode', UPCONVERT_MODES, '0'),
		setDownconvertMode: chDrop('Set Down Convert Mode', 'eParamID_Vid1DownconvertMode', DOWNCONVERT_MODES, '0'),

		// ── Freeze / Loss of Input ──────────────────────────
		freezeOutput: chDrop('Freeze Output', 'eParamID_Vid1FreezeOutput', ON_OFF, '1'),
		setFreezeOnLoss: chDrop('Set Loss of Input Action', 'eParamID_Vid1FreezeOnInputLoss', FREEZE_ON_LOSS, '0'),

		// ── Test Pattern ────────────────────────────────────
		setTestPattern: chDrop('Test Pattern Generator', 'eParamID_Vid1VideoOutputMode', TEST_PATTERNS, '0'),
		setTestPatternType: chDrop('Test Pattern Type', 'eParamID_Vid1TestPatternVideo', TEST_PATTERN_TYPES, '0'),

		// ── Background ──────────────────────────────────────
		setBackgroundFill: chDrop('Set Background Fill', 'eParamID_Vid1BackgroundFill', BACKGROUND_FILL, '0'),
		setBackgroundFormat: chNum('Set Background Format', 'eParamID_Vid1BackgroundFormat'),

		// ── YUV ProcAmp (FS2) ───────────────────────────────
		setProcAmpEnable: chDrop('ProcAmp Enable', 'eParamID_Vid1YUVProcAmpEnable', ON_OFF, '0'),
		setProcAmpGain: chNum('Set ProcAmp Gain', 'eParamID_Vid1YUVProcAmpGain'),
		setProcAmpBlack: chNum('Set ProcAmp Black', 'eParamID_Vid1YUVProcAmpBlack'),
		setProcAmpHue: chNum('Set ProcAmp Hue', 'eParamID_Vid1YUVProcAmpHue'),
		setProcAmpSaturation: chNum('Set ProcAmp Saturation', 'eParamID_Vid1YUVProcAmpSat'),

		// ── RGB Color Corrector (FS2) ───────────────────────
		setColorCorrectorEnable: chDrop('Color Corrector Enable', 'eParamID_Vid1RGBProcAmpEnable', ON_OFF, '0'),
		setColorCorrectorGain: chCompNum('Set Color Corrector Gain', CC_GAIN_PARAMS),
		setColorCorrectorBlack: chCompNum('Set Color Corrector Black', CC_BLACK_PARAMS),
		setColorCorrectorGamma: chCompNum('Set Color Corrector Gamma', CC_GAMMA_PARAMS),

		// ── HDR Transform ───────────────────────────────────
		setHDRTransform: chDrop('Set HDR Transform Mode', 'eParamID_Vid1ColorHDRTransform', HDR_TRANSFORMS, '0'),
		setColorfrontMode: chDrop('Set Colorfront Engine Mode', 'eParamID_Vid1ColorfrontMode', COLORFRONT_MODES, '0'),

		// ── Dynamic Range & Gamut ───────────────────────────
		setDynRangeIn: chDrop('Set Dynamic Range & Gamut IN', 'eParamID_Vid1DynamicRangeAndGamut', DYN_RANGE_IN, '0'),
		setDynRangeOut: chDrop('Set Dynamic Range & Gamut OUT', 'eParamID_Vid1DynamicRangeAndGamutOut', DYN_RANGE_OUT, '0'),

		// ── HDR Color Adjust (FS4/FS-HDR) ───────────────────
		setHDRGain: chCompNum('Set HDR Gain', HDR_GAIN_PARAMS),
		setHDRLift: chCompNum('Set HDR Lift', HDR_LIFT_PARAMS),
		setHDRGamma: chCompNum('Set HDR Gamma', HDR_GAMMA_PARAMS),
		setHDRSaturation: chNum('Set HDR Saturation', 'eParamID_Vid1ColorHDRSaturation'),
		setHDRExposure: chNum('Set HDR Exposure', 'eParamID_Vid1ColorHDRExposure'),
		setHDRColorTemp: chNum('Set HDR Color Temperature', 'eParamID_Vid1ColorHDRColorTemp'),
		setHDRTint: chNum('Set HDR Tint', 'eParamID_Vid1ColorHDRTint'),
		setHDRAmount: chNum('Set HDR Amount', 'eParamID_Vid1ColorHDRAmount'),
		setHDRSoftness: chNum('Set HDR SDR Softness', 'eParamID_Vid1ColorHDRSoftness'),
		setHDRLogLook: chNum('Set HDR Log Look', 'eParamID_Vid1ColorHDRLogLook'),
		setHDRPQNitLevel: chNum('Set PQ Output Nit Level', 'eParamID_Vid1ColorHDRPQoutNitLvl'),
		setHDRBT2408: chDrop('Set BT.2408 Mode', 'eParamID_Vid1ColorHDRBT2408', ON_OFF, '0'),
		setAmbientLightComp: chNum('Set Ambient Light Compensation', 'eParamID_Vid1AmbLightComp'),

		// ── SDR Preview ─────────────────────────────────────
		setSdrPreview: chDrop('SDR Preview', 'eParamID_Vid1SdrPreview', ON_OFF, '0'),

		// ── HDR Color Reset ─────────────────────────────────
		resetHDRColor: {
			name: 'Reset HDR Color (CFE-Live)',
			options: [{ id: 'channel', type: 'dropdown', label: 'Channel', choices: channels, default: '1' }],
			callback: async (action) => {
				const param = vidParam('eParamID_Vid1ColorHDRReset', String(action.options.channel))
				await instance.apiSetParam(param, '1')
			},
		},

		// ── TV Mode (FS4/FS-HDR) ────────────────────────────
		setTVConversion: chDrop('Set TV Conversion', 'eParamID_TV_Vid1Conversion', TV_CONVERSIONS, '8'),
		setTVColorfrontMode: chDrop('Set TV Colorfront Mode', 'eParamID_TV_Vid1ColorfrontMode', COLORFRONT_MODES, '0'),
		setTVColorCorrector: chDrop('TV Color Corrector Enable', 'eParamID_TV_Vid1ColorCorrector', ON_OFF, '0'),
		setTVGain: chCompNum('Set TV Gain', TV_GAIN_PARAMS),
		setTVLift: chNum('Set TV Master Lift', 'eParamID_TV_Vid1MasterLift'),
		setTVGamma: chNum('Set TV Master Gamma', 'eParamID_TV_Vid1MasterGamma'),
		setTVSaturation: chNum('Set TV Saturation', 'eParamID_TV_Vid1HDRSaturation'),
		setTVExposure: chNum('Set TV Exposure', 'eParamID_TV_Vid1HDRExposure'),
		setTVColorTemp: chNum('Set TV Color Temperature', 'eParamID_TV_Vid1HDRColorTemp'),
		setTVTint: chNum('Set TV Tint', 'eParamID_TV_Vid1HDRTint'),
		setTVKneePoint: chNum('Set TV Knee Point', 'eParamID_TV_Vid1HDRKneePoint'),
		setTVKneeSlope: chNum('Set TV Knee Slope', 'eParamID_TV_Vid1HDRKneeSlope'),

		// ── Film Mode (FS4/FS-HDR) ──────────────────────────
		setFilmColorfrontMode: chDrop(
			'Set Film Colorfront Mode',
			'eParamID_Film_Vid1ColorfrontMode',
			COLORFRONT_MODES,
			'0',
		),
		setFilmDynRangeIn: chDrop('Set Film Dynamic Range IN', 'eParamID_Film_Vid1DynamicRangeAndGamut', DYN_RANGE_IN, '0'),
		setFilmDynRangeOut: chDrop(
			'Set Film Dynamic Range OUT',
			'eParamID_Film_Vid1DynamicRangeAndGamutOut',
			DYN_RANGE_OUT,
			'0',
		),
		setFilmGradingColorspace: chNum('Set Film Grading Colorspace', 'eParamID_Film_Vid1GradingColorspace'),
		setFilmLookSelect: chCompNum('Set Film Look', FILM_LOOK_PARAMS),
		setFilmABMix: chNum('Set Film A/B Mix', 'eParamID_Film_Vid1LookABMix'),
		setFilmSaturation: chNum('Set Film Saturation', 'eParamID_Film_Vid1ColorHDRSaturation'),
		setFilmExposure: chNum('Set Film Exposure', 'eParamID_Film_Vid1ColorHDRExposure'),
		setFilmColorTemp: chNum('Set Film Color Temperature', 'eParamID_Film_Vid1ColorHDRColorTemp'),
		setFilmTint: chNum('Set Film Tint', 'eParamID_Film_Vid1ColorHDRTint'),

		// ── LUT (FS4/FS-HDR) ────────────────────────────────
		setLUTSelect: chCompNum('Set LUT Selection', LUT_SELECT_PARAMS),
		setLUTColorspace: chCompNum('Set LUT Colorspace', LUT_COLORSPACE_PARAMS),
		setLUTRange: chCompNum('Set LUT Range', LUT_RANGE_PARAMS),
		setLUTTransferChar: chNum('Set LUT Transfer Characteristic', 'eParamID_Vid1LUTDyn_TransferChar'),

		// ── Video Legalizer (FS4/FS-HDR) ────────────────────
		setVideoLegalizer: chDrop('Video Legalizer Enable', 'eParamID_Vid1VideoLegalizer', ON_OFF, '0'),
		setLegalizerClip: chCompNum('Set Legalizer Clip', LEGALIZER_CLIP_PARAMS),

		// ── Matte (FS4/FS-HDR) ──────────────────────────────
		setMatteColor: chCompNum('Set Matte Color', MATTE_PARAMS),

		// ── Audio ───────────────────────────────────────────
		setAudioOutput: {
			name: 'Set Audio Output Source',
			options: [
				{ id: 'output', type: 'dropdown', label: 'Output', choices: channels, default: '1' },
				{ id: 'source', type: 'dropdown', label: 'Source', choices: AUDIO_OUTPUT_SOURCES, default: '18' },
			],
			callback: async (action) => {
				const paramId = `eParamID_AudioOutputSelect_Vid${action.options.output}Embed`
				await instance.apiSetParam(paramId, String(action.options.source))
			},
		},

		setAudioEmbedMap: {
			name: 'Set Audio Embed Channel Map',
			options: [
				{ id: 'output', type: 'dropdown', label: 'Output Port', choices: channels, default: '1' },
				{
					id: 'outputChannel',
					type: 'dropdown',
					label: 'Output Channel',
					choices: AUDIO_OUTPUT_CHANNELS,
					default: '1',
				},
				{
					id: 'sourceChannel',
					type: 'dropdown',
					label: 'Source Channel',
					choices: getAudioSourceChannels(),
					default: '0',
				},
			],
			callback: async (action) => {
				const paramId = `eParamID_AudioOutputCh${action.options.outputChannel}_SDI${action.options.output}`
				await instance.apiSetParam(paramId, String(action.options.sourceChannel))
			},
		},

		// ── Generic Parameter Set ───────────────────────────
		setParameterFromList: {
			name: 'Set Parameter (from list)',
			options: [
				{
					id: 'paramId',
					type: 'dropdown',
					label: 'Parameter',
					choices: paramChoices,
					default: paramChoices[0]?.id ?? '',
				},
				{
					id: 'channel',
					type: 'dropdown',
					label: 'Channel',
					choices: channels,
					default: '1',
					isVisible: (opts) => String(opts.paramId).includes('Vid1'),
				},
				{ id: 'value', type: 'textinput', label: 'Value', default: '', required: true },
			],
			callback: async (action) => {
				const baseParam = String(action.options.paramId)
				const param = vidParam(baseParam, String(action.options.channel))
				await instance.apiSetParam(param, String(action.options.value))
			},
		},

		setParameterCustom: {
			name: 'Set Parameter (custom ID)',
			options: [
				{ id: 'paramId', type: 'textinput', label: 'Parameter ID', default: '', required: true },
				{ id: 'value', type: 'textinput', label: 'Value', default: '', required: true },
			],
			callback: async (action) => {
				await instance.apiSetParam(String(action.options.paramId), String(action.options.value))
			},
		},
	})
}
