/**
 * Parameter definitions and categorization for AJA FS-series devices.
 * Covers FS2, FS4, and FS-HDR.
 */

export type DeviceType = 'FS2' | 'FS4' | 'FS-HDR' | 'unknown'

export interface ParamChoice {
	id: string
	label: string
}

/** Common genlock/reference source values */
export const GENLOCK_SOURCES: ParamChoice[] = [
	{ id: '0', label: 'Reference BNC' },
	{ id: '1', label: 'Free Run' },
	{ id: '2', label: 'SDI 1' },
	{ id: '3', label: 'SDI 2' },
	{ id: '4', label: 'SDI 3' },
	{ id: '5', label: 'SDI 4' },
	{ id: '6', label: 'SDI 5' },
	{ id: '7', label: 'SDI 6' },
	{ id: '8', label: 'SDI 7' },
	{ id: '9', label: 'SDI 8' },
]

/** Video channels available per device */
export function getVideoChannels(device: DeviceType): ParamChoice[] {
	switch (device) {
		case 'FS2':
			return [
				{ id: '1', label: 'Video 1' },
				{ id: '2', label: 'Video 2' },
			]
		case 'FS4':
			return [
				{ id: '1', label: 'Video 1' },
				{ id: '2', label: 'Video 2' },
				{ id: '3', label: 'Video 3' },
				{ id: '4', label: 'Video 4' },
			]
		case 'FS-HDR':
			return [
				{ id: '1', label: 'Video 1' },
				{ id: '2', label: 'Video 2' },
				{ id: '3', label: 'Video 3' },
				{ id: '4', label: 'Video 4' },
			]
		default:
			return [
				{ id: '1', label: 'Video 1' },
				{ id: '2', label: 'Video 2' },
				{ id: '3', label: 'Video 3' },
				{ id: '4', label: 'Video 4' },
			]
	}
}

/** HDR transform modes (FS-HDR / FS4) */
export const HDR_TRANSFORMS: ParamChoice[] = [
	{ id: '0', label: 'Colorfront Engine-Live' },
	{ id: '5', label: 'Colorfront Engine-Film' },
	{ id: '8', label: 'Colorfront Engine-TV' },
	{ id: '1', label: 'BBC HLG LUT' },
	{ id: '7', label: 'NBCU LUT' },
	{ id: '2', label: 'User LUT' },
]

/** Dynamic range & gamut input modes */
export const DYN_RANGE_IN: ParamChoice[] = [
	{ id: '0', label: 'SDR BT.709 100 Nits' },
	{ id: '15', label: 'SDR Extended BT.709' },
	{ id: '1', label: 'PQ BT.2020 1000 Nits' },
	{ id: '2', label: 'PQ P3D65 1000 Nits' },
	{ id: '3', label: 'Hybrid Log Gamma BT.2100' },
	{ id: '13', label: 'HLG Extended BT.709' },
]

/** Dynamic range & gamut output modes */
export const DYN_RANGE_OUT: ParamChoice[] = [
	{ id: '0', label: 'SDR BT.709 100 Nits' },
	{ id: '9', label: 'SDR Extended BT.709' },
	{ id: '1', label: 'PQ BT.2020 1000 Nits' },
	{ id: '10', label: 'PQ P3D65 1000 Nits' },
	{ id: '2', label: 'Hybrid Log Gamma BT.2100' },
	{ id: '7', label: 'HLG Extended BT.709' },
]

/** TV mode conversions (FS4/FS-HDR) */
export const TV_CONVERSIONS: ParamChoice[] = [
	{ id: '8', label: 'SDR to SDR' },
	{ id: '0', label: 'SDR to HLG' },
	{ id: '2', label: 'SDR to PQ' },
	{ id: '7', label: 'HLG to HLG' },
	{ id: '1', label: 'HLG to SDR' },
	{ id: '3', label: 'HLG to PQ' },
	{ id: '6', label: 'PQ to PQ' },
	{ id: '4', label: 'PQ to SDR' },
	{ id: '5', label: 'PQ to HLG' },
]

/** Colorfront engine modes */
export const COLORFRONT_MODES: ParamChoice[] = [
	{ id: '0', label: 'Default' },
	{ id: '1', label: 'Adjust' },
]

/** Common on/off */
export const ON_OFF: ParamChoice[] = [
	{ id: '0', label: 'Off' },
	{ id: '1', label: 'On' },
]

/** Freeze on input loss */
export const FREEZE_ON_LOSS: ParamChoice[] = [
	{ id: '0', label: 'Black' },
	{ id: '1', label: 'Freeze' },
]

/** Test pattern modes */
export const TEST_PATTERNS: ParamChoice[] = [
	{ id: '0', label: 'Off' },
	{ id: '4', label: 'On' },
]

/** Test pattern types (FS4/FS-HDR) */
export const TEST_PATTERN_TYPES: ParamChoice[] = [
	{ id: '1', label: 'SDR Bars 75%' },
	{ id: '0', label: 'SDR Bars 100%' },
	{ id: '8', label: 'Black' },
	{ id: '6', label: 'Flat Field' },
	{ id: '14', label: 'HDR Bars PQ Narrow Range' },
	{ id: '15', label: 'HDR Bars PQ Full Range' },
]

/** Background fill options */
export const BACKGROUND_FILL: ParamChoice[] = [
	{ id: '0', label: 'Black' },
	{ id: '1', label: 'Matte' },
	{ id: '3', label: 'Vid 2' },
	{ id: '4', label: 'Vid 3' },
	{ id: '5', label: 'Vid 4' },
]

/** Audio output source modes */
export const AUDIO_OUTPUT_SOURCES: ParamChoice[] = [
	{ id: '0', label: 'SDI 1 Input' },
	{ id: '1', label: 'SDI 2 Input' },
	{ id: '2', label: 'SDI 3 Input' },
	{ id: '3', label: 'SDI 4 Input' },
	{ id: '4', label: 'SDI 5 Input' },
	{ id: '5', label: 'SDI 6 Input' },
	{ id: '6', label: 'SDI 7 Input' },
	{ id: '7', label: 'SDI 8 Input' },
	{ id: '8', label: 'AES/EBU In' },
	{ id: '9', label: 'MADI BNC In' },
	{ id: '10', label: 'MADI Fiber In' },
	{ id: '11', label: 'Mix Down 1 L|R' },
	{ id: '12', label: 'Mix Down 2 L|R' },
	{ id: '15', label: 'Sig Gen 1KHz' },
	{ id: '16', label: 'Sig Gen 400Hz' },
	{ id: '17', label: 'Mute' },
	{ id: '18', label: 'Map' },
]

/** Audio output channels (1-16) */
export const AUDIO_OUTPUT_CHANNELS: ParamChoice[] = Array.from({ length: 16 }, (_, i) => ({
	id: String(i + 1),
	label: `Channel ${i + 1}`,
}))

/** Audio source channel map — all possible source channels for embed mapping */
export function getAudioSourceChannels(): ParamChoice[] {
	const choices: ParamChoice[] = []

	// SDI 1-8, 16 channels each (ids 0-127)
	for (let sdi = 1; sdi <= 8; sdi++) {
		for (let ch = 1; ch <= 16; ch++) {
			choices.push({ id: String((sdi - 1) * 16 + (ch - 1)), label: `SDI ${sdi} Ch ${ch}` })
		}
	}

	// AES 1-16 (ids 128-143)
	for (let ch = 1; ch <= 16; ch++) {
		choices.push({ id: String(127 + ch), label: `AES Ch ${ch}` })
	}

	// MADI BNC 1-64 (ids 144-207)
	for (let ch = 1; ch <= 64; ch++) {
		choices.push({ id: String(143 + ch), label: `MADI BNC Ch ${ch}` })
	}

	// MADI Fiber 1-64 (ids 208-271)
	for (let ch = 1; ch <= 64; ch++) {
		choices.push({ id: String(207 + ch), label: `MADI Fiber Ch ${ch}` })
	}

	// MixDown & utility
	choices.push(
		{ id: '272', label: 'MixDown 1 L' },
		{ id: '273', label: 'MixDown 1 R' },
		{ id: '274', label: 'MixDown 2 L' },
		{ id: '275', label: 'MixDown 2 R' },
		{ id: '280', label: 'Sig Gen 1KHz' },
		{ id: '281', label: 'Sig Gen 400Hz' },
		{ id: '282', label: 'Mute' },
	)

	return choices
}

/** Video input source choices (device-aware SDI count) */
export function getVideoInputChoices(device: DeviceType): ParamChoice[] {
	const count = device === 'FS2' ? 2 : 8
	return Array.from({ length: count }, (_, i) => ({ id: String(i), label: `SDI ${i + 1}` }))
}

/** Up-convert modes (FS2, FS4) */
export const UPCONVERT_MODES: ParamChoice[] = [
	{ id: '0', label: 'Anamorphic' },
	{ id: '1', label: 'Pillar Box 4:3' },
	{ id: '2', label: 'Zoom 14:9' },
	{ id: '3', label: 'Zoom Letterbox' },
	{ id: '4', label: 'Zoom Wide' },
]

/** Down-convert modes (FS2, FS4) */
export const DOWNCONVERT_MODES: ParamChoice[] = [
	{ id: '0', label: 'Letterbox' },
	{ id: '1', label: 'Crop' },
	{ id: '2', label: 'Anamorphic' },
]

/** HDR Gain component params (id is param template, vidParam handles channel) */
export const HDR_GAIN_PARAMS: ParamChoice[] = [
	{ id: 'eParamID_Vid1ColorHDRGainMaster', label: 'Master' },
	{ id: 'eParamID_Vid1ColorHDRGainRed', label: 'Red' },
	{ id: 'eParamID_Vid1ColorHDRGainGreen', label: 'Green' },
	{ id: 'eParamID_Vid1ColorHDRGainBlue', label: 'Blue' },
]

/** HDR Lift component params */
export const HDR_LIFT_PARAMS: ParamChoice[] = [
	{ id: 'eParamID_Vid1ColorHDRLiftMaster', label: 'Master' },
	{ id: 'eParamID_Vid1ColorHDRLiftRed', label: 'Red' },
	{ id: 'eParamID_Vid1ColorHDRLiftGreen', label: 'Green' },
	{ id: 'eParamID_Vid1ColorHDRLiftBlue', label: 'Blue' },
]

/** HDR Gamma component params */
export const HDR_GAMMA_PARAMS: ParamChoice[] = [
	{ id: 'eParamID_Vid1ColorHDRGammaMaster', label: 'Master' },
	{ id: 'eParamID_Vid1ColorHDRGammaRed', label: 'Red' },
	{ id: 'eParamID_Vid1ColorHDRGammaGreen', label: 'Green' },
	{ id: 'eParamID_Vid1ColorHDRGammaBlue', label: 'Blue' },
]

/** TV Mode Gain component params */
export const TV_GAIN_PARAMS: ParamChoice[] = [
	{ id: 'eParamID_TV_Vid1MasterGain', label: 'Master' },
	{ id: 'eParamID_TV_Vid1RedGain', label: 'Red' },
	{ id: 'eParamID_TV_Vid1GreenGain', label: 'Green' },
	{ id: 'eParamID_TV_Vid1BlueGain', label: 'Blue' },
]

/** FS2 RGB Color Corrector Gain component params */
export const CC_GAIN_PARAMS: ParamChoice[] = [
	{ id: 'eParamID_Vid1RGBProcAmpGainRed', label: 'Red' },
	{ id: 'eParamID_Vid1RGBProcAmpGainGreen', label: 'Green' },
	{ id: 'eParamID_Vid1RGBProcAmpGainBlue', label: 'Blue' },
]

/** FS2 RGB Color Corrector Black component params */
export const CC_BLACK_PARAMS: ParamChoice[] = [
	{ id: 'eParamID_Vid1RGBProcAmpBlackRed', label: 'Red' },
	{ id: 'eParamID_Vid1RGBProcAmpBlackGreen', label: 'Green' },
	{ id: 'eParamID_Vid1RGBProcAmpBlackBlue', label: 'Blue' },
]

/** FS2 RGB Color Corrector Gamma component params */
export const CC_GAMMA_PARAMS: ParamChoice[] = [
	{ id: 'eParamID_Vid1RGBProcAmpGammaRed', label: 'Red' },
	{ id: 'eParamID_Vid1RGBProcAmpGammaGreen', label: 'Green' },
	{ id: 'eParamID_Vid1RGBProcAmpGammaBlue', label: 'Blue' },
]

/** Legalizer clip type params */
export const LEGALIZER_CLIP_PARAMS: ParamChoice[] = [
	{ id: 'eParamID_Vid1LegalizerWhiteClip', label: 'White Clip' },
	{ id: 'eParamID_Vid1LegalizerBlackClip', label: 'Black Clip' },
	{ id: 'eParamID_Vid1LegalizerChromaClip', label: 'Chroma Clip' },
]

/** Matte property params */
export const MATTE_PARAMS: ParamChoice[] = [
	{ id: 'eParamID_Vid1MatteLuma', label: 'Luma' },
	{ id: 'eParamID_Vid1MatteChroma', label: 'Chroma' },
	{ id: 'eParamID_Vid1MatteHue', label: 'Hue' },
]

/** LUT type selection params */
export const LUT_SELECT_PARAMS: ParamChoice[] = [
	{ id: 'eParamID_Vid1ColorHDRLUTBBC', label: 'BBC HLG' },
	{ id: 'eParamID_Vid1ColorHDRLUTNBCU', label: 'NBCU' },
	{ id: 'eParamID_Vid1ColorHDRLUTUser', label: 'User' },
]

/** LUT colorspace params */
export const LUT_COLORSPACE_PARAMS: ParamChoice[] = [
	{ id: 'eParamID_Vid1LUTDyn_InColorspace', label: 'Input Colorspace' },
	{ id: 'eParamID_Vid1LUTDyn_OutColorspace', label: 'Output Colorspace' },
]

/** LUT range params */
export const LUT_RANGE_PARAMS: ParamChoice[] = [
	{ id: 'eParamID_Vid1LUTDyn_InScale', label: 'Input Range' },
	{ id: 'eParamID_Vid1LUTDyn_OutScale', label: 'Output Range' },
]

/** Film look slot params */
export const FILM_LOOK_PARAMS: ParamChoice[] = [
	{ id: 'eParamID_Film_Vid1LookASelect', label: 'Look A' },
	{ id: 'eParamID_Film_Vid1LookBSelect', label: 'Look B' },
]

/** SDI format codes */
export const SDI_FORMATS: ParamChoice[] = [
	{ id: '3', label: '525i5994' },
	{ id: '7', label: '625i50' },
	{ id: '17', label: '720p5994' },
	{ id: '18', label: '720p60' },
	{ id: '19', label: '1080i50' },
	{ id: '20', label: '1080i5994' },
	{ id: '21', label: '1080i60' },
	{ id: '27', label: '1080p2398' },
	{ id: '29', label: '1080p25' },
	{ id: '30', label: '1080p2997' },
	{ id: '31', label: '1080p30' },
	{ id: '32', label: '1080p50' },
	{ id: '33', label: '1080p5994' },
	{ id: '34', label: '1080p60' },
	{ id: '56', label: 'UHD2160p2398' },
	{ id: '59', label: 'UHD2160p2997' },
	{ id: '62', label: 'UHD2160p5994' },
	{ id: '63', label: 'UHD2160p60' },
	{ id: '98', label: 'No Input' },
]

/** Map product ID strings to device type */
export function detectDevice(productId: string): DeviceType {
	const upper = productId.toUpperCase()
	if (upper.includes('TORU') || upper.includes('FS-HDR') || upper.includes('FSHDR')) return 'FS-HDR'
	if (upper.includes('FS4') || upper.includes('CORVID')) return 'FS4'
	if (upper.includes('FS2') || upper.includes('XENA')) return 'FS2'
	return 'unknown'
}

/**
 * Categorized parameter groups for building dropdown choices.
 * Each group contains parameters that can be used with the generic set action,
 * organized by functional area.
 */
export interface ParamGroup {
	label: string
	params: ParamChoice[]
	devices: DeviceType[]
}

/** Get parameter ID for a video channel, replacing the channel number */
export function vidParam(baseParam: string, channel: string): string {
	return baseParam.replace('Vid1', `Vid${channel}`)
}

/** All categorized parameter groups for dropdown population */
export function getParamGroups(): ParamGroup[] {
	return [
		{
			label: 'Presets',
			devices: ['FS2', 'FS4', 'FS-HDR'],
			params: [
				{ id: 'eParamID_RegisterRecall', label: 'Recall Preset' },
				{ id: 'eParamID_RegisterSave', label: 'Save Preset' },
				{ id: 'eParamID_RegisterStore', label: 'Store Preset' },
				{ id: 'eParamID_RegisterLoad', label: 'Load Preset' },
			],
		},
		{
			label: 'Reference / Genlock',
			devices: ['FS2', 'FS4', 'FS-HDR'],
			params: [
				{ id: 'eParamID_GenlockSource', label: 'Genlock Source' },
				{ id: 'eParamID_DetectedReferenceFormat', label: 'Detected Reference Format' },
				{ id: 'eParamID_SuppressReferenceAlarm', label: 'Suppress Reference Alarm' },
			],
		},
		{
			label: 'Video Input (per channel)',
			devices: ['FS2', 'FS4', 'FS-HDR'],
			params: [
				{ id: 'eParamID_Vid1VideoInput', label: 'Video Input Select' },
				{ id: 'eParamID_Vid1ActualVideoInput', label: 'Actual Video Input' },
				{ id: 'eParamID_Vid1DetectedInputFormat', label: 'Detected Input Format' },
			],
		},
		{
			label: 'Output Format (per channel)',
			devices: ['FS2', 'FS4', 'FS-HDR'],
			params: [
				{ id: 'eParamID_Vid1OutputFormat', label: 'Output Format' },
				{ id: 'eParamID_Vid1OutputFormat_5923', label: 'Output Format (59/23)' },
				{ id: 'eParamID_Vid1OutputFormat_5025', label: 'Output Format (50/25)' },
				{ id: 'eParamID_Vid1OutputFormat_6024', label: 'Output Format (60/24)' },
			],
		},
		{
			label: 'Freeze / Loss of Input (per channel)',
			devices: ['FS2', 'FS4', 'FS-HDR'],
			params: [
				{ id: 'eParamID_Vid1FreezeOutput', label: 'Freeze Output' },
				{ id: 'eParamID_Vid1FreezeOnInputLoss', label: 'Loss of Input Action' },
			],
		},
		{
			label: 'Test Pattern (per channel)',
			devices: ['FS4', 'FS-HDR'],
			params: [
				{ id: 'eParamID_Vid1VideoOutputMode', label: 'Test Pattern Generator' },
				{ id: 'eParamID_Vid1TestPatternVideo', label: 'Test Pattern Type' },
			],
		},
		{
			label: 'Background (per channel)',
			devices: ['FS4', 'FS-HDR'],
			params: [
				{ id: 'eParamID_Vid1BackgroundFill', label: 'Background Fill' },
				{ id: 'eParamID_Vid1BackgroundFormat', label: 'Background Format' },
			],
		},
		{
			label: 'YUV ProcAmp (per channel)',
			devices: ['FS2'],
			params: [
				{ id: 'eParamID_Vid1YUVProcAmpEnable', label: 'ProcAmp Enable' },
				{ id: 'eParamID_Vid1YUVProcAmpGain', label: 'ProcAmp Gain' },
				{ id: 'eParamID_Vid1YUVProcAmpBlack', label: 'ProcAmp Black' },
				{ id: 'eParamID_Vid1YUVProcAmpHue', label: 'ProcAmp Hue' },
				{ id: 'eParamID_Vid1YUVProcAmpSat', label: 'ProcAmp Saturation' },
			],
		},
		{
			label: 'RGB Color Corrector (per channel)',
			devices: ['FS2'],
			params: [
				{ id: 'eParamID_Vid1RGBProcAmpEnable', label: 'Color Corrector Enable' },
				{ id: 'eParamID_Vid1RGBProcAmpGainRed', label: 'CC Red Gain' },
				{ id: 'eParamID_Vid1RGBProcAmpGainGreen', label: 'CC Green Gain' },
				{ id: 'eParamID_Vid1RGBProcAmpGainBlue', label: 'CC Blue Gain' },
				{ id: 'eParamID_Vid1RGBProcAmpBlackRed', label: 'CC Red Black' },
				{ id: 'eParamID_Vid1RGBProcAmpBlackGreen', label: 'CC Green Black' },
				{ id: 'eParamID_Vid1RGBProcAmpBlackBlue', label: 'CC Blue Black' },
				{ id: 'eParamID_Vid1RGBProcAmpGammaRed', label: 'CC Red Gamma' },
				{ id: 'eParamID_Vid1RGBProcAmpGammaGreen', label: 'CC Green Gamma' },
				{ id: 'eParamID_Vid1RGBProcAmpGammaBlue', label: 'CC Blue Gamma' },
			],
		},
		{
			label: 'HDR Transform (per channel)',
			devices: ['FS4', 'FS-HDR'],
			params: [
				{ id: 'eParamID_Vid1ColorHDRTransform', label: 'HDR Transform Mode' },
				{ id: 'eParamID_Vid1ColorfrontMode', label: 'Colorfront Engine Mode' },
				{ id: 'eParamID_Vid1DynamicRangeAndGamut', label: 'Dynamic Range & Gamut IN' },
				{ id: 'eParamID_Vid1DynamicRangeAndGamutOut', label: 'Dynamic Range & Gamut OUT' },
				{ id: 'eParamID_Vid1SdrPreview', label: 'SDR Preview' },
			],
		},
		{
			label: 'HDR Color Adjust (per channel)',
			devices: ['FS4', 'FS-HDR'],
			params: [
				{ id: 'eParamID_Vid1ColorHDRGainMaster', label: 'Master Gain' },
				{ id: 'eParamID_Vid1ColorHDRGainRed', label: 'Red Gain' },
				{ id: 'eParamID_Vid1ColorHDRGainGreen', label: 'Green Gain' },
				{ id: 'eParamID_Vid1ColorHDRGainBlue', label: 'Blue Gain' },
				{ id: 'eParamID_Vid1ColorHDRLiftMaster', label: 'Master Lift' },
				{ id: 'eParamID_Vid1ColorHDRLiftRed', label: 'Red Lift' },
				{ id: 'eParamID_Vid1ColorHDRLiftGreen', label: 'Green Lift' },
				{ id: 'eParamID_Vid1ColorHDRLiftBlue', label: 'Blue Lift' },
				{ id: 'eParamID_Vid1ColorHDRGammaMaster', label: 'Master Gamma' },
				{ id: 'eParamID_Vid1ColorHDRGammaRed', label: 'Red Gamma' },
				{ id: 'eParamID_Vid1ColorHDRGammaGreen', label: 'Green Gamma' },
				{ id: 'eParamID_Vid1ColorHDRGammaBlue', label: 'Blue Gamma' },
				{ id: 'eParamID_Vid1ColorHDRSaturation', label: 'Saturation' },
				{ id: 'eParamID_Vid1ColorHDRExposure', label: 'Exposure' },
				{ id: 'eParamID_Vid1ColorHDRColorTemp', label: 'Color Temperature' },
				{ id: 'eParamID_Vid1ColorHDRTint', label: 'Tint' },
				{ id: 'eParamID_Vid1ColorHDRAmount', label: 'HDR Amount' },
				{ id: 'eParamID_Vid1ColorHDRSoftness', label: 'SDR Softness' },
				{ id: 'eParamID_Vid1ColorHDRLogLook', label: 'HDR Log Look' },
				{ id: 'eParamID_Vid1ColorHDRPQoutNitLvl', label: 'PQ Output Nit Level' },
				{ id: 'eParamID_Vid1ColorHDRBT2408', label: 'BT.2408 Mode' },
				{ id: 'eParamID_Vid1AmbLightComp', label: 'Ambient Light Compensation' },
			],
		},
		{
			label: 'HDR Reset (per channel)',
			devices: ['FS4', 'FS-HDR'],
			params: [{ id: 'eParamID_Vid1ColorHDRReset', label: 'CFE-Live Reset' }],
		},
		{
			label: 'TV Mode (per channel)',
			devices: ['FS4', 'FS-HDR'],
			params: [
				{ id: 'eParamID_TV_Vid1Conversion', label: 'TV Conversion Mode' },
				{ id: 'eParamID_TV_Vid1ColorfrontMode', label: 'TV Colorfront Mode' },
				{ id: 'eParamID_TV_Vid1ColorCorrector', label: 'TV Color Corrector' },
				{ id: 'eParamID_TV_Vid1MasterGain', label: 'TV Master Gain' },
				{ id: 'eParamID_TV_Vid1RedGain', label: 'TV Red Gain' },
				{ id: 'eParamID_TV_Vid1GreenGain', label: 'TV Green Gain' },
				{ id: 'eParamID_TV_Vid1BlueGain', label: 'TV Blue Gain' },
				{ id: 'eParamID_TV_Vid1MasterLift', label: 'TV Master Lift' },
				{ id: 'eParamID_TV_Vid1MasterGamma', label: 'TV Master Gamma' },
				{ id: 'eParamID_TV_Vid1HDRSaturation', label: 'TV Saturation' },
				{ id: 'eParamID_TV_Vid1HDRExposure', label: 'TV Exposure' },
				{ id: 'eParamID_TV_Vid1HDRColorTemp', label: 'TV Color Temperature' },
				{ id: 'eParamID_TV_Vid1HDRTint', label: 'TV Tint' },
				{ id: 'eParamID_TV_Vid1HDRKneePoint', label: 'TV Knee Point' },
				{ id: 'eParamID_TV_Vid1HDRKneeSlope', label: 'TV Knee Slope' },
			],
		},
		{
			label: 'Film Mode (per channel)',
			devices: ['FS4', 'FS-HDR'],
			params: [
				{ id: 'eParamID_Film_Vid1ColorfrontMode', label: 'Film Colorfront Mode' },
				{ id: 'eParamID_Film_Vid1DynamicRangeAndGamut', label: 'Film Dyn Range & Gamut IN' },
				{ id: 'eParamID_Film_Vid1DynamicRangeAndGamutOut', label: 'Film Dyn Range & Gamut OUT' },
				{ id: 'eParamID_Film_Vid1GradingColorspace', label: 'Film Grading Colorspace' },
				{ id: 'eParamID_Film_Vid1LookASelect', label: 'Film Look A' },
				{ id: 'eParamID_Film_Vid1LookBSelect', label: 'Film Look B' },
				{ id: 'eParamID_Film_Vid1LookABMix', label: 'Film A/B Mix' },
				{ id: 'eParamID_Film_Vid1ColorHDRSaturation', label: 'Film Saturation' },
				{ id: 'eParamID_Film_Vid1ColorHDRExposure', label: 'Film Exposure' },
				{ id: 'eParamID_Film_Vid1ColorHDRColorTemp', label: 'Film Color Temp' },
				{ id: 'eParamID_Film_Vid1ColorHDRTint', label: 'Film Tint' },
			],
		},
		{
			label: 'LUT (per channel)',
			devices: ['FS4', 'FS-HDR'],
			params: [
				{ id: 'eParamID_Vid1ColorHDRLUTBBC', label: 'BBC HLG LUT Selection' },
				{ id: 'eParamID_Vid1ColorHDRLUTNBCU', label: 'NBCU LUT Selection' },
				{ id: 'eParamID_Vid1ColorHDRLUTUser', label: 'User LUT Selection' },
				{ id: 'eParamID_Vid1LUTDyn_InColorspace', label: 'LUT In Colorspace' },
				{ id: 'eParamID_Vid1LUTDyn_OutColorspace', label: 'LUT Out Colorspace' },
				{ id: 'eParamID_Vid1LUTDyn_InScale', label: 'LUT In Range' },
				{ id: 'eParamID_Vid1LUTDyn_OutScale', label: 'LUT Out Range' },
				{ id: 'eParamID_Vid1LUTDyn_TransferChar', label: 'LUT Transfer Characteristic' },
			],
		},
		{
			label: 'Matte (per channel)',
			devices: ['FS4', 'FS-HDR'],
			params: [
				{ id: 'eParamID_Vid1MatteLuma', label: 'Matte Luma' },
				{ id: 'eParamID_Vid1MatteChroma', label: 'Matte Chroma' },
				{ id: 'eParamID_Vid1MatteHue', label: 'Matte Hue' },
			],
		},
		{
			label: 'Up/Down Convert (per channel)',
			devices: ['FS2', 'FS4'],
			params: [
				{ id: 'eParamID_Vid1UFCTransformActive', label: 'UFC Transform' },
				{ id: 'eParamID_Vid1UFCPresetActive', label: 'UFC Preset' },
				{ id: 'eParamID_Vid1UpconvertMode', label: 'Up Convert Mode' },
				{ id: 'eParamID_Vid1DownconvertMode', label: 'Down Convert Mode' },
			],
		},
		{
			label: 'Video Legalizer (per channel)',
			devices: ['FS4', 'FS-HDR'],
			params: [
				{ id: 'eParamID_Vid1VideoLegalizer', label: 'Video Legalizer' },
				{ id: 'eParamID_Vid1LegalizerWhiteClip', label: 'Legalizer White Clip' },
				{ id: 'eParamID_Vid1LegalizerBlackClip', label: 'Legalizer Black Clip' },
				{ id: 'eParamID_Vid1LegalizerChromaClip', label: 'Legalizer Chroma Clip' },
			],
		},
		{
			label: 'Audio Output',
			devices: ['FS2', 'FS4', 'FS-HDR'],
			params: [
				{ id: 'eParamID_AudioOutputSelect_Vid1Embed', label: 'Vid 1 Audio Output Source' },
				{ id: 'eParamID_AudioOutputSelect_Vid2Embed', label: 'Vid 2 Audio Output Source' },
			],
		},
		{
			label: 'System',
			devices: ['FS2', 'FS4', 'FS-HDR'],
			params: [
				{ id: 'eParamID_SystemName', label: 'System Name' },
				{ id: 'eParamID_ProductID', label: 'Product ID' },
				{ id: 'eParamID_SoftwareVersion', label: 'Software Version' },
			],
		},
	]
}

/**
 * Build a flat list of all parameters as dropdown choices,
 * grouped by category with group headers.
 */
export function getAllParamChoices(device: DeviceType): ParamChoice[] {
	const groups = getParamGroups()
	const choices: ParamChoice[] = []

	for (const group of groups) {
		if (device !== 'unknown' && !group.devices.includes(device)) continue

		for (const param of group.params) {
			choices.push({
				id: param.id,
				label: `[${group.label}] ${param.label}`,
			})
		}
	}

	return choices
}
